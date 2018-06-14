package org.reviewmanager.service;

import java.io.IOException;
import java.util.Map;

import org.apache.http.HttpHost;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.utility.RMUtil;
import org.springframework.stereotype.Service;

@Service
public class ElasticService {

	public RestHighLevelClient elasticClient;

	public ElasticService() {
		this.elasticClient = new RestHighLevelClient(RestClient.builder(new HttpHost("https://pszy1vgpf6:2116w02js5@pepper-5577325.us-east-1.bonsaisearch.net")));
	}

	public IndexResponse addObject(String reviewIndex, String reviewType, Map<String, Object> jsonMap) {
		IndexResponse response = null;
		try {
			IndexRequest indexRequest = new IndexRequest(reviewIndex, reviewType).source(jsonMap);
			response = this.elasticClient.index(indexRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	public UpdateResponse updateObject(String reviewIndex, String reviewType, String Id, Map<String, Object> jsonMap) {
		UpdateResponse response = null;
		try {
			UpdateRequest updateRequest = new UpdateRequest(reviewIndex, reviewType, Id).doc(jsonMap);
			response = this.elasticClient.update(updateRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	public SearchResponse getAllObjects(String reviewIndex, String reviewType) {
		SearchResponse response = null;
		try {
			SearchRequest searchRequest = new SearchRequest(reviewIndex).types(reviewType)
					.searchType(SearchType.DEFAULT);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.query(QueryBuilders.matchAllQuery());
			searchSourceBuilder.size(1000);
			searchRequest.source(searchSourceBuilder);
			response = this.elasticClient.search(searchRequest);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return response;
	}

	public SearchResponse getObjectBasedOnField(String reviewIndex, String reviewType, String fieldName,
			String fieldValue) {
		SearchResponse response = null;
		try {
			SearchRequest searchRequest = new SearchRequest(reviewIndex).types(reviewType)
					.searchType(SearchType.DEFAULT);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.query(QueryBuilders.boolQuery().minimumShouldMatch(1)
					.must(QueryBuilders.matchPhraseQuery("clientUserName", RMUtil.getSessionedUser().getUsername()))
					.should(QueryBuilders.matchPhraseQuery(fieldName, fieldValue)));
			searchSourceBuilder.size(1000);
			searchRequest.source(searchSourceBuilder);
			response = this.elasticClient.search(searchRequest);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return response;
	}

	public SearchResponse getObjectBasedOnClientUserName(String reviewIndex, String reviewType,String fieldName, String username) {
		SearchResponse response = null;
		try {
			SearchRequest searchRequest = new SearchRequest(reviewIndex).types(reviewType)
					.searchType(SearchType.DEFAULT);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.query(QueryBuilders.matchPhraseQuery(fieldName, username));
			searchSourceBuilder.size(1000);
			searchRequest.source(searchSourceBuilder);
			response = this.elasticClient.search(searchRequest);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return response;
	}

	public SearchResponse getReview(String reviewIndex, String reviewType, String username, String reviewContent,
			String sortBy, SortOrder sortOrder) {
		SearchResponse response = null;
		try {
			SearchRequest searchRequest = new SearchRequest(reviewIndex).types(reviewType)
					.searchType(SearchType.DEFAULT);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.query(QueryBuilders.boolQuery().minimumShouldMatch(1)
					.must(QueryBuilders.matchPhraseQuery("clientUserName", username)).should(QueryBuilders
							.wildcardQuery("reviewContent", "*" + reviewContent.toLowerCase().trim() + "*")));
			searchSourceBuilder.sort(sortBy, sortOrder);
			searchSourceBuilder.size(1000);
			searchRequest.source(searchSourceBuilder);
			response = this.elasticClient.search(searchRequest);
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		return response;
	}

	public DeleteResponse deleteObject(String reviewIndex, String reviewType,String reviewId) {
		DeleteResponse response = null;
		try {
			response = this.elasticClient.delete(new DeleteRequest(reviewIndex).type(reviewType).id(reviewId));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
	}

	public boolean reConnectElastic() {
		try {
			this.elasticClient.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		this.elasticClient = new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
		return true;
	}

	public GetResponse getObjectFromId(String reviewIndex, String reviewType, String reviewId) {
		GetResponse response = null;
		try {
			response = this.elasticClient.get(new GetRequest(reviewIndex, reviewType, reviewId));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
	}

}
