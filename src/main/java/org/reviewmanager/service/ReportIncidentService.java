
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

import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortOrder;
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
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class ReportIncidentService {

	@Autowired(required = true)
	public ElasticService elasticService;

	public Map<String, Object> addReview(ReviewObject reviewObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		IndexResponse indexResponse = elasticService.addObject(RMUtil.REVIEW_INDEX, RMUtil.REVIEW_TYPE,
				reviewObject.getReviewObjectMap());
		reportResult.put("result", indexResponse.getResult());
		return reportResult;
	}

	public Map<String, Object> addCompetitor(BusinessObject businessObject) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		IndexResponse indexResponse = elasticService.addObject(RMUtil.COMPETITOR_INDEX, RMUtil.COMPETITOR_TYPE,
				businessObject.getBusinessObjectMap());
		reportResult.put("result", indexResponse.getResult());
		return reportResult;
	}

	public Map<String, Object> addDashboardObject(Dashboard dashboard) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		IndexResponse indexResponse = elasticService.addObject(RMUtil.DASHBOARD_INDEX, RMUtil.DASHBOARD_TYPE,
				dashboard.getDashboardMap());
		reportResult.put("result", indexResponse.getResult());
		return reportResult;
	}

	public Map<String, Object> addTrendingData(Trending trending) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		IndexResponse indexResponse = elasticService.addObject(RMUtil.TRENDING_INDEX, RMUtil.TRENDING_TYPE,
				trending.getTrendingMap());
		reportResult.put("result", indexResponse.getResult());
		return reportResult;
	}

	public Map<String, Object> addUser(ReviewManagerNewUser newUserRequest) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		ReviewManagerUser newUser = newUserRequest.getUser();
		try {
			SearchResponse searchResponse = elasticService.getObjectBasedOnField(RMUtil.USER_INDEX, RMUtil.USER_TYPE,
					"username", newUserRequest.getUsername());
			if (searchResponse == null || searchResponse.getHits().totalHits == 0) {

				IndexResponse indexResponse = elasticService.addObject(RMUtil.USER_INDEX, RMUtil.USER_TYPE,
						newUser.getReviewManagerUserMap());
				reportResult.put("result", indexResponse.getResult());
				reportResult.put("success", true);
			} else {
				reportResult.put("success", false);
				reportResult.put("result", "Username already registered.");
			}
		} catch (Exception ex) {
			reportResult.put("success", false);
			reportResult.put("result", "Error while crateing user.");
		}

		return reportResult;
	}

	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		String clientID = null;
		ReviewManagerUser newUser = null;
		try{
		SearchResponse searchResponse = elasticService.getObjectBasedOnClientUserName(RMUtil.USER_INDEX,
				RMUtil.USER_TYPE,userNameField, userNameValue);
		Gson gson = new Gson();
		JsonObject jsonData = null;
		if (searchResponse != null && searchResponse.getHits().totalHits > 0) {
			for (SearchHit searchHit : searchResponse.getHits().getHits()) {
				jsonData = gson.fromJson(searchHit.getSourceAsString(), JsonObject.class);
				clientID = searchHit.getId();
			}
			newUser = RMUtil.getUserObject(jsonData);
		} }catch(Exception ex){ex.printStackTrace();}
		reportResult.put("id", clientID);
		reportResult.put("result", newUser);
		return reportResult;
	}

	public Map<String, Object> getCompetitor(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchResponse = elasticService.getObjectBasedOnField(RMUtil.COMPETITOR_INDEX,
				RMUtil.COMPETITOR_TYPE, "clientUserName", username);
		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (SearchHit searchHit : searchResponse.getHits().getHits()) {
			searchReviewObj = gson.fromJson(searchHit.getSourceAsString(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		reportResult.put("took", searchResponse.getTook());
		return reportResult;
	}

	public Map<String, Object> getPerformers(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchResponse = elasticService.getObjectBasedOnField(RMUtil.COMPETITOR_INDEX,
				RMUtil.COMPETITOR_TYPE, "clientUserName", username);
		List<BusinessObject> searchReview = new LinkedList<BusinessObject>();
		BusinessObject searchReviewObj = null;
		Gson gson = new Gson();
		for (SearchHit searchHit : searchResponse.getHits().getHits()) {
			searchReviewObj = gson.fromJson(searchHit.getSourceAsString(), BusinessObject.class);
			searchReview.add(searchReviewObj);
		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		reportResult.put("took", searchResponse.getTook());
		return reportResult;
	}

	public Map<String, Object> getReview(String reviewContent, String username, String sortBy, SortOrder sortType) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchesponse = elasticService.getReview(RMUtil.REVIEW_INDEX, RMUtil.REVIEW_TYPE, username,
				reviewContent, sortBy, sortType);
		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();
		for (SearchHit searchHit : searchesponse.getHits().getHits()) {
			searchReviewObj = gson.fromJson(searchHit.getSourceAsString(), ReviewObject.class);
			searchReviewObj.setReviewId(searchHit.getId());
			searchReview.add(searchReviewObj);

		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	public Map<String, Object> getDashboardObject(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchesponse = elasticService.getObjectBasedOnField(RMUtil.DASHBOARD_INDEX,
				RMUtil.DASHBOARD_TYPE, "clientUserName", username);
		Dashboard dashboardObj = null;
		Gson gson = new Gson();
		String id = null;
		for (SearchHit searchHit : searchesponse.getHits().getHits()) {
			dashboardObj = gson.fromJson(searchHit.getSourceAsString(), Dashboard.class);
			id = searchHit.getId();
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
		reportResult.put("total", searchesponse.getHits().totalHits);
		reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	public Map<String, Object> getTrendingData(String username) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchesponse = elasticService.getObjectBasedOnField(RMUtil.TRENDING_INDEX, RMUtil.TRENDING_TYPE,
				"clientUserName", username);
		Trending trending = null;
		String id = null;
		Gson gson = new Gson();
		for (SearchHit searchHit : searchesponse.getHits().getHits()) {
			trending = gson.fromJson(searchHit.getSourceAsString(), Trending.class);
			id = searchHit.getId();
		}

		reportResult.put("result", trending);
		reportResult.put("id", id);
		reportResult.put("total", searchesponse.getHits().totalHits);
		reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

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
				dashboardChartData.add(new DashboardChartObject(reviewObject.getPostedDate(), reviewObject.getTotalStars().toString(),
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

				List<DashboardChartObject> dashboardChartData = dashboard.getDashboardChartData().stream().filter(chartObj -> {
					return RMUtil.isMonthSame(chartObj.getRatingDate(),reviewObject.getPostedDate());
				}).collect(Collectors.toList());
				
				if(dashboardChartData.isEmpty()){
					dashboard.getDashboardChartData().add(new DashboardChartObject(reviewObject.getPostedDate(), reviewObject.getTotalStars().toString(),
								reviewObject.getTotalStars().toString(), reviewObject.getTotalStars().toString()));
				} else {
					Iterator<DashboardChartObject> chartDataIterator = dashboardChartData.iterator();
				  while(chartDataIterator.hasNext()){
					  DashboardChartObject chartObject = chartDataIterator.next();
					  chartObject.setRatingDate(reviewObject.getPostedDate());
					  chartObject.setFacebookRating(String.valueOf((Double.parseDouble(chartObject.getFacebookRating()) + reviewObject.getTotalStars())/2));
					  chartObject.setGoogleRating( String.valueOf((Double.parseDouble(chartObject.getGoogleRating()) + reviewObject.getTotalStars())/2));
					  chartObject.setYelpRating(String.valueOf((Double.parseDouble(chartObject.getYelpRating()) + reviewObject.getTotalStars())/2));
				  }
				
				}
				
			}

			if (isNew)
				resutMap.put("dashboard", elasticService.addObject(RMUtil.DASHBOARD_INDEX, RMUtil.DASHBOARD_TYPE,
						dashboard.getDashboardMap()));
			else
				resutMap.put("dashboard", elasticService.updateObject(RMUtil.DASHBOARD_INDEX, RMUtil.DASHBOARD_TYPE,
						objectID, dashboard.getDashboardMap()));

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

			if (isNew)
				resutMap.put("trending", elasticService.addObject(RMUtil.TRENDING_INDEX, RMUtil.TRENDING_TYPE,
						trending.getTrendingMap()));
			else
				resutMap.put("trending", elasticService.updateObject(RMUtil.TRENDING_INDEX, RMUtil.TRENDING_TYPE,
						objectID, trending.getTrendingMap()));

		}
		return resutMap;
	}

	public Map<String, Object> updateUser(String clientId, ReviewManagerUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		user.setModifiedOn(new Date());
		UpdateResponse response = elasticService.updateObject(RMUtil.USER_INDEX, RMUtil.USER_TYPE, clientId,
				user.getReviewManagerUserMap());
		data.put("result", response);
		return data;
	}

	public Map<String, Object> addActionItem(String reviewId) {
		Map<String, Object> data = new HashMap<String, Object>();
		GetResponse response = elasticService.getObjectFromId(RMUtil.REVIEW_INDEX, RMUtil.REVIEW_TYPE, reviewId);
		if (response != null) {
			SearchResponse searchResponse = elasticService.getObjectBasedOnField(RMUtil.ACTION_ITEM_INDEX,
					RMUtil.ACTION_ITEM_TYPE, "reviewContent",
					response.getSourceAsMap().get("reviewContent").toString());
			if (searchResponse == null || searchResponse.getHits().totalHits == 0) {
				IndexResponse addResponse = elasticService.addObject(RMUtil.ACTION_ITEM_INDEX, RMUtil.ACTION_ITEM_TYPE,
						response.getSourceAsMap());
				data.put("result", addResponse.getResult());
				data.put("success", true);
			} else {
				data.put("result", "Action item already added.");
				data.put("success", false);
			}
		}
		return data;
	}

	public Map<String, Object> removeActionItem(String reviewId) {
		Map<String, Object> data = new HashMap<String, Object>();
		DeleteResponse response = elasticService.deleteObject(RMUtil.ACTION_ITEM_INDEX, RMUtil.ACTION_ITEM_TYPE,
				reviewId);
		if (response != null) {
			data.put("result", response.getResult());
			data.put("success", true);
		} else {
			data.put("result", "Item not found");
			data.put("success", false);
		}
		return data;
	}

	public Map<String, Object> getActionItem(String reviewContent, String username, String sortBy, SortOrder sortType) {
		Map<String, Object> reportResult = new HashMap<String, Object>();
		SearchResponse searchesponse = elasticService.getReview(RMUtil.ACTION_ITEM_INDEX, RMUtil.ACTION_ITEM_TYPE,
				username, reviewContent, sortBy, sortType);
		List<ReviewObject> searchReview = new LinkedList<ReviewObject>();
		ReviewObject searchReviewObj = null;
		Gson gson = new Gson();
		for (SearchHit searchHit : searchesponse.getHits().getHits()) {
			searchReviewObj = gson.fromJson(searchHit.getSourceAsString(), ReviewObject.class);
			searchReviewObj.setReviewId(searchHit.getId());
			searchReview.add(searchReviewObj);

		}
		reportResult.put("result", searchReview);
		reportResult.put("total", searchReview.size());
		reportResult.put("took", searchesponse.getTook());
		return reportResult;
	}

	public void logError(String className, String methodName, String errorDetail) {
		try {
			elasticService.addObject(RMUtil.ERROR_INDEX, RMUtil.ERROR_TYPE,
					RMUtil.getApplicationError(className, methodName, errorDetail));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
