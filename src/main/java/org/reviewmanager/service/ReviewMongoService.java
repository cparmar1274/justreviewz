package org.reviewmanager.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.Dashboard;
import org.reviewmanager.pojo.DashboardChartObject;
import org.reviewmanager.pojo.LabelValue;
import org.reviewmanager.pojo.ReviewManagerNewUser;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.Trending;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

@Service(value = "mongo")
public class ReviewMongoService implements ReviewServiceInterface {

	@Autowired(required = true)
	public MongoService mongoService;

	public ReviewMongoService() {
		super();
	}

	@Override
	public Map<String, Object> addReview(ReviewObject reviewObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		BasicDBObject document = new BasicDBObject();
		document.putAll(reviewObject.getReviewObjectMap());

		BasicDBObject searchQuery = new BasicDBObject().append("postedDate", reviewObject.getPostedDate())
				.append("clientUserName", reviewObject.getClientUserName())
				.append("reviewContent", reviewObject.getReviewContent());
		WriteResult data = mongoService.addObject(RMUtil.REVIEW_INDEX, searchQuery, document);

		reportResult.put("result", data.toString());
		reportResult.put("updateOfExisting", data.isUpdateOfExisting());
		return reportResult;
	}

	@Override
	public Map<String, Object> addCompetitor(BusinessObject businessObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("businessName", businessObject.getBusinessName())
				.append("clientUserName", businessObject.getClientUserName());

		BasicDBObject document = new BasicDBObject();
		document.putAll(businessObject.getBusinessObjectMap());

		WriteResult data = mongoService.addObject(RMUtil.COMPETITOR_INDEX, searchQuery, document);

		reportResult.put("result", data.toString());
		return reportResult;
	}


	@Override
	public Map<String, Object> addUser(ReviewManagerNewUser newUserRequest) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		ReviewManagerUser newUser = newUserRequest.getUser();
		try {

			BasicDBObject document = new BasicDBObject();
			document.putAll(newUser.getReviewManagerUserMap());

			BasicDBObject searchQuery = new BasicDBObject().append("clientEmail", newUser.getClientEmail())
					.append("username", newUser.getUsername());
			WriteResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, document);

			reportResult.put("result", result.toString());
			reportResult.put("success", true);
		} catch (Exception ex) {
			reportResult.put("success", false);
			reportResult.put("result", "Error while creating user. Please try again after sometime.");
		}

		return reportResult;
	}

	@Override
	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Gson gson = new Gson();
		JsonObject jsonData = null;
		String clientID = null;
		ReviewManagerUser newUser = null;
		try {
			BasicDBObject searchQuery = new BasicDBObject().append(userNameField, userNameValue);
			DBCursor cursor = mongoService.getObject(RMUtil.USER_INDEX, searchQuery);

			for (DBObject searchHit : cursor.toArray()) {
				jsonData = gson.fromJson(searchHit.toString(), JsonObject.class);
				 clientID = String.valueOf(searchHit.toMap().get("_id"));
			}
			newUser = RMUtil.getUserObject(jsonData);

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		 reportResult.put("id", clientID);
		reportResult.put("result", newUser);
		return reportResult;
	}

	@Override
	public Map<String, Object> getCompetitor(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", username);

		DBCursor cursor = mongoService.getObject(RMUtil.COMPETITOR_INDEX, searchQuery);

		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (DBObject searchHit : cursor.toArray()) {
			searchReviewObj = gson.fromJson(searchHit.toString(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		return reportResult;
	}

	@Override
	public Map<String, Object> getPerformers(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();

		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", username);

		DBCursor cursor = mongoService.getObject(RMUtil.PERFORMER_INDEX, searchQuery);
		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (DBObject searchHit : cursor.toArray()) {
			searchReviewObj = gson.fromJson(searchHit.toString(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		return reportResult;
	}

	@Override
	public Map<String, Object> getReview(String reviewContent, String username, String sortBy, SortOrder sortType) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();

		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", username);
		if (!reviewContent.isEmpty())
			searchQuery.append("$text",new BasicDBObject().append("$search", reviewContent) );

		DBCursor cursor = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery);
		BasicDBObject sortObj = new BasicDBObject().append(sortBy, SortOrder.ASC == sortType ? 1 : -1);
		cursor.sort(sortObj);
		for (DBObject dbObj : cursor.toArray()) {
			searchReviewObj = gson.fromJson(dbObj.toString(), ReviewObject.class);
			searchReviewObj.setReviewId(String.valueOf(dbObj.toMap().get("_id")));
			searchReview.add(searchReviewObj);
		}

		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	@Override
	public Map<String, Object> getDashboardObject(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Dashboard dashboardObj = null;
		Gson gson = new Gson();
		String id = null;

		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName",
				RMUtil.getSessionedUser().getUsername());
		DBCursor cursor = mongoService.getObject(RMUtil.DASHBOARD_INDEX, searchQuery);

		for (DBObject dbObject : cursor.toArray()) {
			dashboardObj = gson.fromJson(dbObject.toString(), Dashboard.class);
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
		reportResult.put("total", cursor.count());
		// reportResult.put("total", searchesponse.getHits().totalHits);
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	@Override
	public Map<String, Object> getTrendingData(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		Trending trending = null;
		// String id = null;
		Gson gson = new Gson();

		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName",
				RMUtil.getSessionedUser().getUsername());
		DBCursor cursor = mongoService.getObject(RMUtil.TRENDING_INDEX, searchQuery);
		for (DBObject dbObject : cursor.toArray()) {
			trending = gson.fromJson(dbObject.toString(), Trending.class);
		}

		reportResult.put("result", trending);
		// reportResult.put("id", id);
		reportResult.put("total", cursor.count());
		// reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	@Override
	public Map<String, Object> updateDashboardAndTrending(ReviewObject reviewObject) {
		Map<String, Object> mapData = null, resutMap = new HashMap<String, Object>();
		Dashboard dashboard = null;
		Trending trending = null;

		// update Dashboard Data
		try {
			mapData = this.getDashboardObject(reviewObject.getClientUserName());
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		if (mapData == null || mapData.get("result") == null || mapData.get("result") instanceof Dashboard) {
			dashboard = mapData != null ? (Dashboard) mapData.get("result") : null;
			;
			String objectID = mapData != null ? String.valueOf(mapData.get("id")) : null;
			boolean isNew = false;
			if (dashboard == null) {
				isNew = true;
				dashboard = new Dashboard();
				dashboard.setClientUserName(reviewObject.getClientUserName());
				dashboard.setTotalNegative(reviewObject.isNegativeReview() ? 1 : 0);
				dashboard.setTotalPositive(reviewObject.isPositiveReview() ? 1 : 0);
				dashboard.setTotalNeutral(reviewObject.isNeutralReview() ? 1 : 0);
				dashboard.setTotalRating(reviewObject.getTotalStars());
				List<DashboardChartObject> dashboardChartData = new ArrayList<DashboardChartObject>();
				dashboardChartData.add(
						new DashboardChartObject(reviewObject.getPostedDate(), reviewObject.getTotalStars().toString(),
								reviewObject.getTotalStars().toString(), reviewObject.getTotalStars().toString()));
				dashboard.setDashboardChartData(dashboardChartData);
			} else {
				dashboard.setTotalNegative(reviewObject.isNegativeReview() ? dashboard.getTotalNegative() + 1
						: dashboard.getTotalNegative());
				dashboard.setTotalPositive(reviewObject.isPositiveReview() ? dashboard.getTotalPositive() + 1
						: dashboard.getTotalPositive());
				dashboard.setTotalNeutral(
						reviewObject.isNeutralReview() ? dashboard.getTotalNeutral() + 1 : dashboard.getTotalNeutral());
				dashboard.setTotalRating((reviewObject.getTotalStars() + dashboard.getTotalRating()) / 2);

				List<DashboardChartObject> dashboardChartData = dashboard.getDashboardChartData().stream()
						.filter(chartObj -> {
							return RMUtil.isMonthSame(chartObj.getRatingDate(), reviewObject.getPostedDate());
						}).collect(Collectors.toList());

				if (dashboardChartData.isEmpty()) {
					dashboard.getDashboardChartData()
							.add(new DashboardChartObject(reviewObject.getPostedDate(),
									reviewObject.getTotalStars().toString(), reviewObject.getTotalStars().toString(),
									reviewObject.getTotalStars().toString()));
				} else {
					Iterator<DashboardChartObject> chartDataIterator = dashboardChartData.iterator();
					while (chartDataIterator.hasNext()) {
						DashboardChartObject chartObject = chartDataIterator.next();
						chartObject.setRatingDate(reviewObject.getPostedDate());
						chartObject.setFacebookRating(String.valueOf(
								(Double.parseDouble(chartObject.getFacebookRating()) + reviewObject.getTotalStars())
										/ 2));
						chartObject.setGoogleRating(String.valueOf(
								(Double.parseDouble(chartObject.getGoogleRating()) + reviewObject.getTotalStars())
										/ 2));
						chartObject.setYelpRating(String.valueOf(
								(Double.parseDouble(chartObject.getYelpRating()) + reviewObject.getTotalStars()) / 2));
					}

				}

			}

			BasicDBObject document = new BasicDBObject();
			document.putAll(dashboard.getDashboardMap());
			BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", dashboard.getClientUserName());
			mongoService.addObject(RMUtil.DASHBOARD_INDEX, searchQuery, document);

		}

		// update Trending Data
		try {
			mapData = this.getTrendingData(reviewObject.getClientUserName());
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
				trending.setClientUserName(reviewObject.getClientUserName());
			}
			trending.analyseReview(reviewObject.getReviewContent(), reviewObject.getTotalStars());


			BasicDBObject document = new BasicDBObject();
			document.putAll(trending.getTrendingMap());
			BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", trending.getClientUserName());
			mongoService.addObject(RMUtil.TRENDING_INDEX, searchQuery, document);

		}
		return resutMap;
	}

	@Override
	public Map<String, Object> updateUser(String clientId, ReviewManagerUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		user.setModifiedOn(new Date());

		BasicDBObject document = new BasicDBObject(user.getReviewManagerUserMap());

		BasicDBObject searchQuery = new BasicDBObject().append("clientId", user.getClientId())
				.append("clientEmail", user.getClientEmail()).append("username", user.getUsername());
		WriteResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery, document);
		data.put("result", result);
		return data;
	}

	@Override
	public Map<String, Object> addActionItem(String reviewId) {
		Map<String,Object> data = new HashMap<String,Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("_id", new ObjectId(reviewId));
		DBCursor dbData = mongoService.getObject(RMUtil.REVIEW_INDEX, searchQuery);
		for(DBObject obj : dbData.toArray()){
			Map<String,Object> objMap = obj.toMap();
			BasicDBObject document = new BasicDBObject();
			document.putAll(objMap);
			
			BasicDBObject docQuery = new BasicDBObject().append("clientUserName", obj.toMap().get("clientUserName"))
					.append("reviewContent", obj.toMap().get("reviewContent"))
					.append("postedDate", obj.toMap().get("postedDate"))
					.append("postedBy", obj.toMap().get("postedBy"))
					.append("totalRating", obj.toMap().get("totalRating"));
			
			WriteResult result = mongoService.addObject(RMUtil.ACTION_ITEM_INDEX, docQuery, document);
			data.put("result", objMap.get("_id").toString()+ " Action item already added.");
			data.put("success", true);
		}
		
		return data;
	}

	@Override
	public Map<String, Object> removeActionItem(String reviewId) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("_id",new ObjectId(reviewId));
		WriteResult result = mongoService.deleteObject(RMUtil.ACTION_ITEM_INDEX, searchQuery);
		data.put("result", result.toString());
		data.put("success", true);
		return data;
	}

	@Override
	public Map<String, Object> getActionItem(String reviewContent, String username, String sortBy, SortOrder sortType) {
		BasicDBObject searchQuery = new BasicDBObject().append("clientUserName", username);
		DBCursor dbCursor = mongoService.getObject(RMUtil.ACTION_ITEM_INDEX, searchQuery);
		dbCursor.sort(new BasicDBObject().append(sortBy, 1));

		Map<String, Object> reportResult = new HashMap<String, Object>();
		
		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();
		for (DBObject searchHit : dbCursor.toArray()) {
			searchReviewObj = gson.fromJson(searchHit.toString(), ReviewObject.class);
			searchReviewObj.setReviewId(String.valueOf(searchHit.toMap().get("_id")));
			searchReview.add(searchReviewObj);

		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		//reportResult.put("took", searchesponse.getTook());
		return reportResult;
	
	}

	@Override
	public void logError(String className, String methodName, String errorDetail) {
		BasicDBObject document = new BasicDBObject();
		document.putAll(RMUtil.getApplicationError(className, methodName, errorDetail));
		BasicDBObject searchQuery = new BasicDBObject();
		mongoService.addObject(RMUtil.ERROR_INDEX, searchQuery, document);
	}

	@Override
	public Map<String, Object> resetPassword(String clientEmail) {
		
		BasicDBObject searchQuery = new BasicDBObject().append("clientEmail", clientEmail);
		DBCursor searchResponse = mongoService.getObject(RMUtil.USER_INDEX, searchQuery);
		
		Map<String,Object> data = null,resultData = new HashMap<String,Object>();
		String newPasswordText = RMUtil.generateRandomPasswordText();
		for(DBObject search :searchResponse.toArray()){
			
			Map<String,Object> searchData = search.toMap();
			searchData.put("modifiedOn", new Date());
			String newPassword = RMUtil.getBCrypt().encode(newPasswordText);
			searchData.put("password", newPassword);
			
			BasicDBObject searchNew = new BasicDBObject(searchData);
			
			
			WriteResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery,searchNew);
			resultData.put("result", "password reset successfully");
			resultData.put("newPassword",newPasswordText);
			resultData.put("success", true);
		}
		return resultData;
	}

	@Override
	public Map<String, Object> changePassword(String newPassword, String oldPassword) {
		
		BasicDBObject searchQuery = new BasicDBObject().append("clientEmail", RMUtil.getSessionedUser().getClientEmail())
				.append("clientId",RMUtil.getSessionedUser().getClientId());
		DBCursor searchResponse = mongoService.getObject(RMUtil.USER_INDEX, searchQuery);
		
		Map<String,Object> data = null,resultData = new HashMap<String,Object>();
		for(DBObject search :searchResponse.toArray()){
			data = search.toMap();
			data.put("modifiedOn", new Date());
			
			if(BCrypt.checkpw(oldPassword, data.get("password").toString())){ 
				String nPassword = RMUtil.getBCrypt().encode(newPassword);
				data.put("password", nPassword);
				WriteResult result = mongoService.addObject(RMUtil.USER_INDEX, searchQuery,new BasicDBObject(data));
				resultData.put("result", "password reset successfully");
				resultData.put("newPassword",nPassword);
				resultData.put("success", true);
			}
			else {
				resultData.put("result", "old password doesn't match with our records. please try again.");
				resultData.put("success", false);
			}
			
		}
		return resultData;
	}

}
