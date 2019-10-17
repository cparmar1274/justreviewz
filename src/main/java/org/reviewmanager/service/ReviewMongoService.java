package org.reviewmanager.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.Dashboard;
import org.reviewmanager.pojo.DashboardChartObject;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.LabelValue;
import org.reviewmanager.pojo.ProductObject;
import org.reviewmanager.pojo.PromotionCounterObject;
import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryAnswers;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.SearchBusinessObject;
import org.reviewmanager.pojo.Trending;
import org.reviewmanager.users.BusinessUser;
import org.reviewmanager.users.BusinessUserTemp;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

// TODO: Auto-generated Javadoc
/**
 * The Class ReviewMongoService.
 *
 * @author Chirag Parmar { support@justreviewz.com | Developed for Just Reviewz
 *         Inc.}
 */
@Service(value = "mongo")
public class ReviewMongoService implements ReviewServiceInterface {

	/** The mongo service. */

	/** The place service. */
	@Autowired(required = true)
	public PlacesService placeService;

	/** The recent service. */
	@Autowired(required = true)
	public RMRecentService recentService;

	/** The email service. */
	@Autowired(required = true)
	public RMEmailService emailService;

	@Autowired(required = true)
	public MongoService mongoService;

	/** The rest template. */
	public RestTemplate restTemplate;

	/** The headers. */
	public HttpHeaders headers;

	/**
	 * Instantiates a new review mongo service.
	 */
	public ReviewMongoService() {
		super();
		restTemplate = new RestTemplate();
		headers = new HttpHeaders();
	}

	/**
	 * Sets the header authorization.
	 */
	public void setHeaderAuthorization() {
		Random random = new Random();
		headers.remove("Authorization");
		headers.add("Authorization", RMUtil.YELP_API_KEY[random.nextInt(RMUtil.YELP_API_KEY.length)]);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.reviewmanager.interfaces.ReviewServiceInterface#addReview(org.
	 * reviewmanager.pojo.ReviewObject)
	 */
	@Override
	public Map<String, Object> addReview(ReviewObject reviewObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		if (reviewObject.getReviewId() == null || reviewObject.getReviewId().isEmpty())
			reviewObject.setReviewId(String.valueOf(this.getTotalObjects(RMUtil.REVIEW_INDEX)));

		BasicDBObject document = new BasicDBObject();
		document.putAll(reviewObject.getReviewObjectMap());

		BasicDBObject searchQuery = new BasicDBObject().append("reviewId", reviewObject.getReviewId())
				.append("clientId", reviewObject.getClientId()).append("reviewText", reviewObject.getReviewText());

		UpdateResult data = mongoService.addObject(RMUtil.REVIEW_INDEX, searchQuery, document);

		// local cache service
		recentService.addReviewObject(reviewObject);

		reportResult.put("result", data.toString());
		reportResult.put("updateOfExisting", data.getUpsertedId());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addPublicQuery(org.
	 * reviewmanager.pojo.QueryObject)
	 */
	@Override
	public Map<String, Object> addPublicQuery(QueryObject queryObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		BasicDBObject document = new BasicDBObject();

		if (queryObject.getQueryId() == null || queryObject.getQueryId().isEmpty())
			queryObject.setQueryId(String.valueOf(this.getTotalObjects(RMUtil.QUERY_INDEX)));

		BasicDBObject searchDoc = new BasicDBObject();
		searchDoc.append("clientId", queryObject.getClientId()).append("queryId", queryObject.getQueryId());
		document.putAll(RMUtil.getMap(queryObject));

		recentService.addQueryObject(queryObject);

		UpdateResult data = mongoService.addObject(RMUtil.QUERY_INDEX, searchDoc, document);

		reportResult.put("result", data.toString());
		reportResult.put("updateOfExisting", data.getUpsertedId());
		reportResult.put("historicAnswer", this.updateHistoricAnswer(queryObject));
		return reportResult;
	}

	private UpdateResult updateHistoricAnswer(QueryObject queryObject) {
		QueryAnswers queryAnswers = new QueryAnswers(queryObject);
		BasicDBObject queryAnswer = new BasicDBObject();
		queryAnswer.append("queryId", queryAnswers.getQueryId()).append("answerByName", queryAnswers.getAnswerByName())
				.append("answerByEmail", queryAnswers.getAnswerByEmail())
				.append("answerText", queryAnswers.getAnswerText());
		return mongoService.addObject(RMUtil.QUERY_ANSWERS, queryAnswer, queryAnswer);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPublicQuery(org.
	 * reviewmanager.pojo.QueryObject)
	 */
	@Override
	public Map<String, Object> getPublicQuery(QueryObject queryObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		BasicDBObject document = new BasicDBObject();
		document.putAll(RMUtil.getMap(queryObject));
		List<Document> cursor = mongoService.getObject(RMUtil.QUERY_INDEX, document,
				new BasicDBObject().append("postedDate", -1));
		QueryObject object = null;
		List<QueryObject> queryObjects = new ArrayList<>();
		for (Document searchHit : cursor) {
			try {
				object = RMUtil.gson.fromJson(searchHit.toJson(), QueryObject.class);
				object.setQueryAnswers(this.getPublicQueryAnswers(object));
				queryObjects.add(object);
			} catch (Exception ex) {
				System.out.println("Error Serializing :" + searchHit.toString());
			}
		}
		reportResult.put("result", queryObjects);
		reportResult.put("total", queryObjects.size());
		return reportResult;
	}

	private List<QueryAnswers> getPublicQueryAnswers(QueryObject queryObject) {
		BasicDBObject document = new BasicDBObject();
		document.append("queryId", queryObject.getQueryId());
		List<Document> cursor = mongoService.getObject(RMUtil.QUERY_ANSWERS, document,
				new BasicDBObject().append("answerDate", -1));
		QueryAnswers object = null;
		List<QueryAnswers> queryAnswers = new ArrayList<>();
		for (Document searchHit : cursor) {
			try {
				object = RMUtil.gson.fromJson(searchHit.toJson(), QueryAnswers.class);
				queryAnswers.add(object);
			} catch (Exception ex) {
				System.out.println("Error Serializing :" + searchHit.toString());
			}
		}
		return queryAnswers;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addCompetitor(org.
	 * reviewmanager.pojo.BusinessObject)
	 */
	@Override
	public Map<String, Object> addCompetitor(BusinessObject businessObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("businessName", businessObject.getBusinessName())
				.append("clientId", businessObject.getClientId());

		BasicDBObject document = new BasicDBObject();
		document.putAll(businessObject.getBusinessObjectMap());

		UpdateResult data = mongoService.addObject(RMUtil.COMPETITOR_INDEX, searchQuery, document);

		reportResult.put("result", data.toString());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.reviewmanager.interfaces.ReviewServiceInterface#addUser(org.
	 * reviewmanager .users.BusinessUserTemp)
	 */
	@Override
	public Map<String, Object> addUser(BusinessUserTemp newUserRequest) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		try {

			newUserRequest.setClientId(newUserRequest.getUsername().trim().toLowerCase());
			BusinessUser newUser = newUserRequest.getUser();
			BasicDBObject document = new BasicDBObject();
			document.putAll(RMUtil.getMap(newUser));

			BasicDBObject searchQuery = new BasicDBObject().append("username", newUser.getUsername().toLowerCase());
			if (!StringUtils.isEmpty(newUser.getClientEmail()))
				searchQuery.append("clientEmail", newUser.getClientEmail());

			UpdateResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, document);

			reportResult.put("clientID", newUserRequest.getClientId());
			reportResult.put("result", result.toString());
			reportResult.put("success", true);
		} catch (Exception ex) {
			reportResult.put("success", false);
			reportResult.put("result", "Error while creating user. Please try again after sometime.");
		}

		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getUser(java.lang.
	 * String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Gson gson = new Gson();
		JsonObject jsonData = null;
		String clientID = null;
		BusinessUser newUser = null;
		try {
			BasicDBObject searchQuery = new BasicDBObject().append(userNameField, userNameValue);
			List<Document> cursor = mongoService.getObject(RMUtil.USER_INDEX, searchQuery, new BasicDBObject());

			for (Document searchHit : cursor) {
				jsonData = gson.fromJson(searchHit.toJson(), JsonObject.class);
				clientID = String.valueOf(searchHit.get("clientId"));
			}
			newUser = RMUtil.getUserObject(jsonData);

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		reportResult.put("id", clientID);
		reportResult.put("result", newUser);
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getCompetitor(java.
	 * lang. String)
	 */
	@Override
	public Map<String, Object> getCompetitor(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", username);

		List<Document> cursor = mongoService.getObject(RMUtil.COMPETITOR_INDEX, searchQuery, new BasicDBObject());

		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (Document searchHit : cursor) {
			searchReviewObj = gson.fromJson(searchHit.toJson(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPerformers(java.
	 * lang. String)
	 */
	@Override
	public Map<String, Object> getPerformers(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", username);

		List<Document> cursor = mongoService.getObject(RMUtil.PERFORMER_INDEX, searchQuery, new BasicDBObject());
		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (Document searchHit : cursor) {
			searchReviewObj = gson.fromJson(searchHit.toJson(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getReview(java.lang.
	 * String, java.lang.String, java.lang.String,
	 * org.elasticsearch.search.sort.SortOrder)
	 */
	@Override
	public Map<String, Object> getReview(String reviewContent, String username, String sortBy, SortOrder sortType) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", username);
		if (!reviewContent.isEmpty())
			searchQuery.append("$regex", reviewContent).append("$options", "i");

		BasicDBObject sortObj = new BasicDBObject().append(sortBy, SortOrder.ASC == sortType ? 1 : -1);
		List<Document> cursor = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery, sortObj);
		for (Document dbObj : cursor) {
			try {
				searchReviewObj = gson.fromJson(dbObj.toJson(), ReviewObject.class);
				searchReview.add(searchReviewObj);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}

		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getDashboardObject(
	 * java. lang.String)
	 */
	@Override
	public Map<String, Object> getDashboardObject(String clientId) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Dashboard dashboardObj = null;
		Gson gson = new Gson();
		String id = null;

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", clientId);
		List<Document> cursor = mongoService.getObject(RMUtil.DASHBOARD_INDEX, searchQuery, new BasicDBObject());

		for (Document dbObject : cursor) {
			dashboardObj = gson.fromJson(dbObject.toJson(), Dashboard.class);
		}

		if (dashboardObj != null) {
			DecimalFormat df = new DecimalFormat("#.00");
			dashboardObj.setTotalRating(Double.parseDouble(df.format(dashboardObj.getTotalRating())));

			dashboardObj.getDashboardChartData().stream().forEach(chartObj -> {
				chartObj.setFacebookRating(df.format(Double.parseDouble(chartObj.getFacebookRating())));
				chartObj.setGoogleRating(df.format(Double.parseDouble(chartObj.getGoogleRating())));
				chartObj.setYelpRating(df.format(Double.parseDouble(chartObj.getYelpRating())));
			});

			int total = dashboardObj.getTotalNegative() + dashboardObj.getTotalNeutral()
					+ dashboardObj.getTotalPositive();

			List<LabelValue> data = new ArrayList<LabelValue>();

			data.add(new LabelValue("Positive",
					String.valueOf(df.format(100 * new Double(dashboardObj.getTotalPositive() * 1.0 / total)))));
			data.add(new LabelValue("Negative",
					String.valueOf(df.format(100 * new Double(dashboardObj.getTotalNegative() * 1.0 / total)))));
			data.add(new LabelValue("Neutral",
					String.valueOf(df.format(100 * new Double(dashboardObj.getTotalNeutral() * 1.0 / total)))));
			reportResult.put("pie", data);
		}

		reportResult.put("id", id);
		reportResult.put("result", dashboardObj);
		reportResult.put("total", cursor.size());
		// reportResult.put("total", searchesponse.getHits().totalHits);
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getTrendingData(java.
	 * lang .String)
	 */
	@Override
	public Map<String, Object> getTrendingData(String clientId) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Trending trending = null;
		// String id = null;
		Gson gson = new Gson();

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", clientId);
		List<Document> cursor = mongoService.getObject(RMUtil.TRENDING_INDEX, searchQuery, new BasicDBObject());
		for (Document dbObject : cursor) {
			trending = gson.fromJson(dbObject.toJson(), Trending.class);
		}

		reportResult.put("result", trending);
		// reportResult.put("id", id);
		reportResult.put("total", cursor.size());
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.reviewmanager.interfaces.ReviewServiceInterface#
	 * updateDashboardAndTrending(org.reviewmanager.pojo.ReviewObject)
	 */
	@Override
	public Map<String, Object> updateDashboardAndTrending(ReviewObject reviewObject) {
		Map<String, Object> mapData = null, resutMap = new HashMap<String, Object>();
		Dashboard dashboard = null;
		Trending trending = null;

		try {
			mapData = this.getDashboardObject(reviewObject.getClientId());
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		if (mapData == null || mapData.get("result") == null || mapData.get("result") instanceof Dashboard) {
			dashboard = mapData != null ? (Dashboard) mapData.get("result") : null;

			String objectID = mapData != null ? String.valueOf(mapData.get("id")) : null;
			boolean isNew = false;
			if (dashboard == null) {
				isNew = true;
				dashboard = new Dashboard();
				dashboard.setClientId(reviewObject.getClientId());
				dashboard.setTotalNegative(reviewObject.isNegativeReview() ? 1 : 0);
				dashboard.setTotalPositive(reviewObject.isPositiveReview() ? 1 : 0);
				dashboard.setTotalNeutral(reviewObject.isNeutralReview() ? 1 : 0);
				dashboard.setTotalRating(reviewObject.getReviewRating());
				List<DashboardChartObject> dashboardChartData = new ArrayList<DashboardChartObject>();
				dashboardChartData.add(new DashboardChartObject(reviewObject.getReviewDate(),
						reviewObject.getReviewRating().toString(), reviewObject.getReviewRating().toString(),
						reviewObject.getReviewRating().toString()));
				dashboard.setDashboardChartData(dashboardChartData);
			} else {
				dashboard.setTotalNegative(reviewObject.isNegativeReview() ? dashboard.getTotalNegative() + 1
						: dashboard.getTotalNegative());
				dashboard.setTotalPositive(reviewObject.isPositiveReview() ? dashboard.getTotalPositive() + 1
						: dashboard.getTotalPositive());
				dashboard.setTotalNeutral(
						reviewObject.isNeutralReview() ? dashboard.getTotalNeutral() + 1 : dashboard.getTotalNeutral());

				dashboard.setTotalRating((reviewObject.getReviewRating() + dashboard.getTotalRating()) / 2);

				List<DashboardChartObject> dashboardChartData = dashboard.getDashboardChartData().stream()
						.filter(chartObj -> {
							return RMUtil.isMonthSame(chartObj.getRatingDate(), reviewObject.getReviewDate());
						}).collect(Collectors.toList());

				if (dashboardChartData.isEmpty()) {
					dashboard.getDashboardChartData().add(new DashboardChartObject(reviewObject.getReviewDate(),
							reviewObject.getReviewRating().toString(), reviewObject.getReviewRating().toString(),
							reviewObject.getReviewRating().toString()));
				} else {
					Iterator<DashboardChartObject> chartDataIterator = dashboardChartData.iterator();
					while (chartDataIterator.hasNext()) {
						DashboardChartObject chartObject = chartDataIterator.next();
						chartObject.setRatingDate(reviewObject.getReviewDate());
						chartObject.setFacebookRating(String.valueOf(
								(Double.parseDouble(chartObject.getFacebookRating()) + reviewObject.getReviewRating())
										/ 2));
						chartObject.setGoogleRating(String.valueOf(
								(Double.parseDouble(chartObject.getGoogleRating()) + reviewObject.getReviewRating())
										/ 2));
						chartObject.setYelpRating(String.valueOf(
								(Double.parseDouble(chartObject.getYelpRating()) + reviewObject.getReviewRating())
										/ 2));
					}

				}

			}

			BasicDBObject document = new BasicDBObject();
			dashboard.setLastUpdated(new Date());
			document.putAll(dashboard.getDashboardMap());
			BasicDBObject searchQuery = new BasicDBObject().append("clientId", dashboard.getClientId());
			mongoService.addObject(RMUtil.DASHBOARD_INDEX, searchQuery, document);

		}

		// update Trending Data
		try {
			mapData = this.getTrendingData(reviewObject.getClientId());
		} catch (Exception ex) {
			ex.getMessage();
		}
		if (mapData == null || mapData.get("result") == null || mapData.get("result") instanceof Trending) {
			trending = mapData != null ? (Trending) mapData.get("result") : null;
			String objectID = mapData != null ? String.valueOf(mapData.get("id")) : null;
			boolean isNew = false;
			if (trending == null) {
				isNew = true;
				trending = new Trending();
				trending.setClientId(reviewObject.getClientId());
			}
			trending.analyseReview(reviewObject.getReviewText(), reviewObject.getReviewRating());

			BasicDBObject document = new BasicDBObject();
			trending.setLastUpdated(new Date());
			document.putAll(trending.getTrendingMap());
			BasicDBObject searchQuery = new BasicDBObject().append("clientId", trending.getClientId());
			mongoService.addObject(RMUtil.TRENDING_INDEX, searchQuery, document);

		}
		return resutMap;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#updateUser(java.lang.
	 * String, org.reviewmanager.users.BusinessUser)
	 */
	@Override
	public Map<String, Object> updateUser(String clientId, BusinessUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		user.setModifiedOn(new Date());

		BasicDBObject document = new BasicDBObject(user.getReviewManagerUserMap());

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", user.getClientId()).append("username",
				user.getUsername());

		UpdateResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, document);

		data.put("result", result);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addActionItem(java.
	 * lang. String)
	 */
	@Override
	public Map<String, Object> addActionItem(String reviewId) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("reviewId", reviewId);
		List<Document> dbData = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery, new BasicDBObject());
		for (Document obj : dbData) {
			Map<String, Object> objMap = obj;
			BasicDBObject document = new BasicDBObject();
			document.putAll(objMap);

			BasicDBObject docQuery = new BasicDBObject().append("clientId", obj.get("clientId"))
					.append("reviewText", obj.get("reviewText")).append("reviewDate", obj.get("reviewDate"))
					.append("postedBy", obj.get("postedBy")).append("reviewRating", obj.get("reviewRating"));

			UpdateResult result = mongoService.addObject(RMUtil.ACTION_ITEM_INDEX, docQuery, document);
			data.put("result", objMap.get("_id").toString() + " Action item already added.");
			data.put("success", true);
		}

		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#removeActionItem(
	 * java. lang.String)
	 */
	@Override
	public Map<String, Object> removeActionItem(String reviewId) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("reviewId", reviewId);
		DeleteResult result = mongoService.deleteObject(RMUtil.ACTION_ITEM_INDEX, searchQuery);
		data.put("result", result);
		data.put("success", true);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getActionItem(java.
	 * lang. String, java.lang.String, java.lang.String,
	 * org.elasticsearch.search.sort.SortOrder)
	 */
	@Override
	public Map<String, Object> getActionItem(String reviewContent, String username, String sortBy, SortOrder sortType) {
		BasicDBObject searchQuery = new BasicDBObject().append("clientId", username);
		List<Document> actionItems = mongoService.getObject(RMUtil.ACTION_ITEM_INDEX, searchQuery,
				new BasicDBObject().append(sortBy, 1));

		Map<String, Object> reportResult = new HashMap<String, Object>();

		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();
		for (Document searchHit : actionItems) {
			searchReviewObj = gson.fromJson(searchHit.toJson(), ReviewObject.class);
			// searchReviewObj.setReviewId(String.valueOf(searchHit.toMap().get("_id")));
			searchReview.add(searchReviewObj);

		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		return reportResult;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#logError(java.lang.
	 * String, java.lang.String, java.lang.String)
	 */
	@Override
	public void logError(String className, String methodName, String errorDetail) {
		BasicDBObject document = new BasicDBObject();
		document.putAll(RMUtil.getApplicationError(className, methodName, errorDetail));
		BasicDBObject searchQuery = new BasicDBObject();
		mongoService.addObject(RMUtil.ERROR_INDEX, searchQuery, document);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#resetPassword(java.
	 * lang. String)
	 */
	@Override
	public Map<String, Object> resetPassword(String clientEmail) {

		BasicDBObject searchQuery = new BasicDBObject().append("username", clientEmail);
		List<Document> searchResponse = mongoService.getObject(RMUtil.USER_INDEX, searchQuery, new BasicDBObject());

		Map<String, Object> data = null, resultData = new HashMap<String, Object>();
		String newPasswordText = RMUtil.generateRandomPasswordText();
		for (Document search : searchResponse) {

			Map<String, Object> searchData = search;
			searchData.put("modifiedOn", new Date());
			String newPassword = RMUtil.getBCrypt().encode(newPasswordText);
			searchData.put("password", newPassword);

			BasicDBObject searchNew = new BasicDBObject(searchData);

			UpdateResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, searchNew);

			// send password thru email.
			emailService.sendEmailNotification(new EmailNotificationObject(searchData.get("clientEmail").toString(),
					searchData.get("clientName").toString(), "PASSWORD RESET",
					"Your new password is " + newPasswordText, searchData.get("clientId").toString()));

			resultData.put("result", "password reset successfully");
			resultData.put("newPassword", newPasswordText);
			resultData.put("success", true);
		}
		return resultData;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#changePassword(java.
	 * lang. String, java.lang.String)
	 */
	@Override
	public Map<String, Object> changePassword(String newPassword, String oldPassword) {

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", RMUtil.getSessionedUser().getClientId());
		List<Document> searchResponse = mongoService.getObject(RMUtil.USER_INDEX, searchQuery, new BasicDBObject());

		Map<String, Object> data = null, resultData = new HashMap<String, Object>();
		for (Document search : searchResponse) {
			data = search;
			data.put("modifiedOn", new Date());

			if (BCrypt.checkpw(oldPassword, data.get("password").toString())) {
				String nPassword = RMUtil.getBCrypt().encode(newPassword);
				data.put("password", nPassword);
				UpdateResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, new BasicDBObject(data));
				resultData.put("result", "password reset successfully");
				resultData.put("newPassword", nPassword);
				resultData.put("success", true);
			} else {
				resultData.put("result", "old password doesn't match with our records. please try again.");
				resultData.put("success", false);
			}

		}
		return resultData;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addPublicReview(org.
	 * reviewmanager.pojo.ReviewObject)
	 */
	@Override
	public Map<String, Object> addPublicReview(ReviewObject reviewObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject();
		BasicDBObject dbObject = new BasicDBObject();
		if (reviewObject.getReviewId() == null || reviewObject.getReviewId().isEmpty())
			reviewObject.setReviewId(String.valueOf(this.getTotalObjects(RMUtil.REVIEW_INDEX)));

		reviewObject.setReviewDate(new Date());
		dbObject.putAll(reviewObject.getReviewObjectMap());

		searchQuery.append("reviewId", reviewObject.getReviewId());
		searchQuery.append("clientId", reviewObject.getClientId());

		recentService.addReviewObject(reviewObject);

		UpdateResult result = mongoService.addObject(RMUtil.REVIEW_INDEX, searchQuery, dbObject);
		data.put("result", result.toString());
		data.put("success", true);
		return data;
	}

	/**
	 * Gets the total objects.
	 *
	 * @param indexName
	 *            the index name
	 * @return the total objects
	 */
	private Integer getTotalObjects(String indexName) {
		BasicDBObject searchQuery = new BasicDBObject();
		List<Document> result = mongoService.getObject(indexName, searchQuery, new BasicDBObject());
		return result.size() + 1;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPublicReviews(org.
	 * reviewmanager.pojo.ReviewObject, java.lang.String)
	 */
	@Override
	public Map<String, Object> getPublicReviews(ReviewObject reviewClient, String sortingOrder) {
		Map<String, Object> data = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", reviewClient.getClientId()).append("replyTo",
				new BasicDBObject("$exists", false));

		List<Document> result = null;

		if (sortingOrder.toLowerCase().contains("oldest"))
			result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery,
					new BasicDBObject().append("reviewDate", 1));
		else if (sortingOrder.toLowerCase().contains("highest"))
			result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery,
					new BasicDBObject().append("reviewRating", -1));
		else if (sortingOrder.toLowerCase().contains("lowest"))
			result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery,
					new BasicDBObject().append("reviewRating", 1));
		else
			result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery,
					new BasicDBObject().append("reviewDate", -1));

		data.put("result", result);
		data.put("averageRating", result.stream().mapToDouble(object -> {
			return object.get("reviewRating") != null ? Double.valueOf(object.get("reviewRating").toString()) : 0.0;
		}).average().orElse(0));

		data.put("total", result.size());
		data.put("success", true);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPublicReplies(org.
	 * reviewmanager.pojo.ReviewObject)
	 */
	@Override
	public Map<String, Object> getPublicReplies(ReviewObject publicReview) {
		Map<String, Object> data = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("replyTo", publicReview.getReviewId());
		List<Document> result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery,
				new BasicDBObject().append("reviewDate", 1));
		data.put("result", result);
		data.put("total", result.size());
		data.put("success", true);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#likeComment(java.
	 * lang. Integer, java.lang.Integer)
	 */
	@Override
	public Map<String, Object> likeComment(Integer reviewId, Integer likeFlag) {

		BasicDBObject searchQuery = new BasicDBObject().append("reviewId", reviewId.toString());
		List<Document> result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery, new BasicDBObject());
		ReviewObject publicReviewObject = null;
		if (result.size() > 0) {
			String dbObj = RMUtil.gson.toJson(result.get(0));
			publicReviewObject = RMUtil.gson.fromJson(dbObj, ReviewObject.class);
		}
		publicReviewObject.manageLike(likeFlag);
		return this.addPublicReview(publicReviewObject);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#dislikeComment(java.
	 * lang. Integer, java.lang.Integer)
	 */
	@Override
	public Map<String, Object> dislikeComment(Integer reviewId, Integer likeFlag) {
		BasicDBObject searchQuery = new BasicDBObject().append("reviewId", reviewId.toString());
		List<Document> result = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery, new BasicDBObject());
		ReviewObject publicReviewObject = null;
		if (result.size() > 0) {
			String dbObj = RMUtil.gson.toJson(result.get(0));
			publicReviewObject = RMUtil.gson.fromJson(dbObj, ReviewObject.class);
		}
		publicReviewObject.manageDisLike(likeFlag);
		return this.addPublicReview(publicReviewObject);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#searchBusiness(java.
	 * lang. String, java.lang.String)
	 */
	@Override
	public Map<String, Object> searchBusiness(String query, String type) {
		this.setHeaderAuthorization();
		Map<String, Object> businesses = new HashMap<>();
		businesses.putAll(
				restTemplate.exchange("https://api.yelp.com/v3/businesses/search?term=" + query + "&location=" + type,
						HttpMethod.GET, new HttpEntity<>("parameters", headers), Map.class).getBody());

		/*
		 * List<Document> data =
		 * mongoService.getObject(RMUtil.ONBOARDED_BUSINESS, new
		 * BasicDBObject().append("clientName", new BasicDBObject("$regex",
		 * query).append("$options", "i")), new BasicDBObject());
		 * List<SearchBusinessObject> searchResults = new ArrayList<>(); for
		 * (Document object : data)
		 * searchResults.add(RMUtil.gson.fromJson(object.toJson(),
		 * SearchBusinessObject.class)); businesses.put("businesses",
		 * searchResults);
		 */
		return businesses;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#searchLocation(java.
	 * lang. String, java.lang.String)
	 */
	@Override
	public Map<String, Object> searchLocation(String query, String type) {
		return placeService.getPlaces(query);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getBusinessCustomers(
	 * java .lang.String)
	 */
	@Override
	public Map<String, Integer> getBusinessCustomers(String clientId) {
		Map<String, Integer> data = new HashMap<String, Integer>();
		BasicDBObject searchQuery = new BasicDBObject().append("clientId", clientId);
		List<Document> result = mongoService.getObject(RMUtil.CLIENT_CUSTOMER_INDEX, searchQuery, new BasicDBObject());
		String email = null;
		for (Document object : result) {
			Integer count = 1;
			email = String.valueOf(object.get("postedEmail"));
			if (!StringUtils.isEmpty(email))
				data.put(email, count);
		}
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPromotion(org.
	 * reviewmanager.pojo.PromotionObject, boolean)
	 */
	@Override
	public Map<String, Object> getPromotion(PromotionObject promotionObject, boolean filter) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("clientId", promotionObject.getClientId());
		List<Document> result = mongoService.getObject(RMUtil.PROMOTION_INDEX, searchQuery, new BasicDBObject());
		PromotionObject promoteObject = null;
		List<PromotionObject> promoteList = new ArrayList<>();
		for (Document object : result) {
			promoteObject = RMUtil.gson.fromJson(object.toJson(), PromotionObject.class);

			if (filter) {
				if (RMUtil.isExpired(promoteObject.getPromotionStartDate(), promoteObject.getPromotionEndDate()))
					promoteList.add(promoteObject);
			} else
				promoteList.add(promoteObject);
		}
		data.put("result", promoteList);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addPromotion(org.
	 * reviewmanager.pojo.PromotionObject)
	 */
	@Override
	public Map<String, Object> addPromotion(PromotionObject promotionObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject();
		BasicDBObject documentQuery = new BasicDBObject();

		if (promotionObject.getPromotionId() == null || promotionObject.getPromotionId().isEmpty())
			promotionObject.setPromotionId(String.valueOf(this.getTotalObjects(RMUtil.PROMOTION_INDEX)));

		searchQuery.append("clientId", promotionObject.getClientId()).append("promotionId",
				promotionObject.getPromotionId());

		documentQuery.putAll(RMUtil.getMap(promotionObject));

		recentService.addPromotionObject(promotionObject);

		data.put("result", mongoService.addObject(RMUtil.PROMOTION_INDEX, searchQuery, documentQuery));
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#getPromotionCounter(
	 * org. reviewmanager.pojo.PromotionCounterObject)
	 */
	@Override
	public Map<String, Object> getPromotionCounter(PromotionCounterObject promotionCounterObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchDoc = new BasicDBObject().append("clientId", promotionCounterObject.getClientId());
		List<Document> result = mongoService.getObject(RMUtil.PROMOTION_COUNTER_INDEX, searchDoc, new BasicDBObject());
		PromotionCounterObject promotionObject = null;
		for (Document dbObject : result) {
			promotionObject = RMUtil.gson.fromJson(dbObject.toJson(), PromotionCounterObject.class);
		}
		data.put("result", promotionObject);
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#requestPromotion(org.
	 * reviewmanager.pojo.PromotionCounterObject, boolean)
	 */
	@Override
	public Map<String, Object> requestPromotion(PromotionCounterObject promotionCounterObject, boolean resetFlag) {
		Map<String, Object> data = new HashMap<String, Object>();

		BasicDBObject searchDoc = new BasicDBObject().append("clientId", promotionCounterObject.getClientId());
		List<Document> result = mongoService.getObject(RMUtil.PROMOTION_COUNTER_INDEX, searchDoc, new BasicDBObject());
		PromotionCounterObject promotionObject = null;
		for (Document dbObject : result) {
			promotionObject = RMUtil.gson.fromJson(dbObject.toJson(), PromotionCounterObject.class);
		}

		if (promotionObject == null)
			promotionObject = new PromotionCounterObject();

		promotionObject.setClientId(promotionCounterObject.getClientId());
		promotionObject.setPromotionRequestCounter(resetFlag ? -1 : promotionObject.getPromotionRequestCounter());

		promotionObject.incrPromotionRequestCounter();
		BasicDBObject document = new BasicDBObject();
		document.putAll(RMUtil.getMap(promotionObject));

		data.put("result", mongoService.addObject(RMUtil.PROMOTION_COUNTER_INDEX, searchDoc, document));
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#addClientCustomer(
	 * java. lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> addClientCustomer(String clientId, String postedEmail, String postedBy) {
		Map<String, Object> data = new HashMap<String, Object>();

		if (StringUtils.isAnyEmpty(clientId, postedEmail))
			return data;

		BasicDBObject searchObject = new BasicDBObject(), documentObject = new BasicDBObject();
		searchObject.append("clientId", clientId).append("postedEmail", postedEmail);
		documentObject.append("clientId", clientId).append("postedEmail", postedEmail).append("postedBy", postedBy);
		data.put("result", mongoService.addObject(RMUtil.CLIENT_CUSTOMER_INDEX, searchObject, documentObject));
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#removeClientCustomer(
	 * java .lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> removeClientCustomer(String clientId, String postedEmail, String postedBy) {
		Map<String, Object> data = new HashMap<String, Object>();

		if (StringUtils.isAnyEmpty(clientId, postedEmail))
			return data;

		BasicDBObject searchObject = new BasicDBObject();
		searchObject.append("clientId", clientId).append("postedEmail", postedEmail);
		mongoService.deleteObject(RMUtil.CLIENT_CUSTOMER_INDEX, searchObject);
		data.put("result", "Unsubscription completed successfully.");
		return data;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.reviewmanager.interfaces.ReviewServiceInterface#registerNewBusiness(
	 * org. reviewmanager.pojo.SearchBusinessObject)
	 */
	@Override
	public Map<String, Object> registerNewBusiness(SearchBusinessObject searchBusinessObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchObject = new BasicDBObject();
		searchObject.putAll(RMUtil.getMap(searchBusinessObject));
		data.put("result", mongoService.addObject(RMUtil.ONBOARDED_BUSINESS, searchObject, searchObject));
		return data;
	}

	@Scheduled(cron = "0 30 3 * * ?")
	public void updateDashboard() {

		// send notification to master.
		emailService.sendEmailNotification(new EmailNotificationObject("support@justreviewz.com", "Chirag Parmar",
				"Dashboard Update", "Dashboard update has been completed successfully.", ""));

		refreshDashboard();
		refreshTreanding();

		// update dashboards
		ExecutorService executeService = Executors.newCachedThreadPool();
		List<Document> cursor = mongoService.getObject(RMUtil.REVIEW_INDEX, new BasicDBObject(), new BasicDBObject());
		for (Document review : cursor) {
			final ReviewObject reviewObject = RMUtil.gson.fromJson(review.toJson(), ReviewObject.class);

			executeService.submit(() -> {
				this.updateDashboardAndTrending(reviewObject);
				return "dashboard updated";
			});
		}
	}

	private void refreshTreanding() {
		List<Document> treandingData = mongoService.getObject(RMUtil.TRENDING_INDEX, new BasicDBObject(),
				new BasicDBObject());
		Trending tread = null;
		for (Document treading : treandingData) {
			tread = RMUtil.gson.fromJson(RMUtil.gson.toJson(treading), Trending.class);
			BasicDBObject searchObject = new BasicDBObject();
			searchObject.append("clientId", tread.getClientId());
			mongoService.deleteObject(RMUtil.TRENDING_INDEX, searchObject);
		}
	}

	private void refreshDashboard() {
		List<Document> dashboardCursor = mongoService.getObject(RMUtil.DASHBOARD_INDEX, new BasicDBObject(),
				new BasicDBObject());
		Dashboard dashboardObject = null;
		for (Document dashboard : dashboardCursor) {
			dashboardObject = RMUtil.gson.fromJson(RMUtil.gson.toJson(dashboard), Dashboard.class);
			BasicDBObject searchObject = new BasicDBObject();
			searchObject.append("clientId", dashboardObject.getClientId());
			mongoService.deleteObject(RMUtil.DASHBOARD_INDEX, searchObject);
		}
	}

	@Override
	public ReviewObject getReviewId(String reviewId) {
		BasicDBObject searchObject = new BasicDBObject();
		searchObject.append("reviewId", reviewId);
		List<Document> cursor = mongoService.getObject(RMUtil.REVIEW_INDEX, searchObject, new BasicDBObject());
		ReviewObject reviewObject = null;
		for (Document review : cursor) {
			reviewObject = RMUtil.gson.fromJson(review.toJson(), ReviewObject.class);
		}
		return reviewObject;
	}

	@Override
	public Map<String, Object> sendDiscount(EmailNotificationObject emailObject) {

		String reviewText = emailObject.getClientId();
		String yourMessage = emailObject.getEmailContent();

		StringBuffer message = new StringBuffer();
		message.append("Thanks you for your feedback.<br>").append(yourMessage).append("<br><br>Review Text<br><i>")
				.append(reviewText).append("</i>");

		emailObject.setEmailContent(message.toString());

		return emailService.sendEmailNotification(emailObject);
	}

	@Override
	public Map<String, Object> postProduct(ProductObject productObject) {
		Map<String, Object> data = new HashMap<String, Object>();

		productObject.setProductId(productObject.getProductName().trim().toLowerCase().replaceAll(" ", "_"));
		BasicDBObject searchObject = new BasicDBObject();
		searchObject.append("productId", productObject.getProductId()).append("productName",
				productObject.getProductName());

		BasicDBObject productData = new BasicDBObject();
		productData.putAll(RMUtil.getMap(productObject));
		data.put("result", mongoService.addObject(RMUtil.PRODUCT_INDEX, searchObject, productData));
		data.put("clientId", productObject.getProductId());
		return data;
	}

	@Override
	public Map<String, Object> getProduct(ProductObject productObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		List<ProductObject> products = new ArrayList<ProductObject>();
		if (StringUtils.isEmpty(productObject.getProductId()))
			productObject.setProductId(String.valueOf(this.getTotalObjects(RMUtil.PRODUCT_INDEX)));

		BasicDBObject searchObject = new BasicDBObject();
		searchObject.append("productName",
				new BasicDBObject("$regex", productObject.getProductName()).append("$options", "i"));

		List<Document> cursor = mongoService.getObject(RMUtil.PRODUCT_INDEX, searchObject, new BasicDBObject());
		ProductObject product = null;
		for (Document dbObject : cursor) {
			product = RMUtil.gson.fromJson(dbObject.toJson(), ProductObject.class);
			products.add(product);
		}
		data.put("result", products);
		return data;
	}

	@Override
	public ProductObject getProductById(String property, String productId) {
		BasicDBObject searchObject = new BasicDBObject();
		searchObject.append(property, productId);
		ProductObject product = null;
		List<Document> cursor = mongoService.getObject(RMUtil.PRODUCT_INDEX, searchObject, new BasicDBObject());
		for (Document dbObject : cursor) {
			product = RMUtil.gson.fromJson(dbObject.toJson(), ProductObject.class);
		}
		return product;
	}

	/*
	 * public static void main(String[] args) {
	 * 
	 * ReviewMongoService reviewService = new ReviewMongoService(); MongoService
	 * mongoService = new MongoService(); Gson gson = new
	 * GsonBuilder().registerTypeAdapter(Date.class,new JsonDeserializer<Date>()
	 * { SimpleDateFormat dateformat = new
	 * SimpleDateFormat("MMM dd, yyyy, hh:mm:ss a",Locale.US);
	 * 
	 * @Override public Date deserialize(JsonElement json, Type typeOfT,
	 * JsonDeserializationContext context) throws JsonParseException { try {
	 * return dateformat.parse(json.getAsString()); } catch (ParseException e) {
	 * System.out.println("Error while parsing date :"+json.getAsString());
	 * return null; } }
	 * 
	 * 
	 * }).create(); List<Document> cursor =
	 * mongoService.getObject(RMUtil.REVIEW_INDEX, new BasicDBObject());
	 * ReviewObject reviewObject = null; for (DBObject review :
	 * cursor.toArray()) { try { reviewObject =
	 * gson.fromJson(gson.toJson(review), ReviewObject.class);
	 * reviewService.updateDashboard(); }catch(Exception e) {
	 * e.printStackTrace(); } }
	 * 
	 * }
	 */

}
