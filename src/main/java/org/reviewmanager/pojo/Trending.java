package org.reviewmanager.pojo;

import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonAutoDetect(fieldVisibility=Visibility.ANY)
public class Trending {

	@JsonProperty(value="clientUserName")
	public String clientUserName;
	
	@JsonProperty("trendingKeywords")
	public Map<String,TrendingKeyword> trendingKeywords;

	public Trending() {
		super();
		// TODO Auto-generated constructor stub
		this.trendingKeywords = new HashMap<String,TrendingKeyword>();
	}

	public Trending(String clientUserName, HashMap<String,TrendingKeyword> trendingKeywords) {
		super();
		this.clientUserName = clientUserName;
		this.trendingKeywords = trendingKeywords;
	}

	

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	public void setTrendingKeywords(Map<String, TrendingKeyword> trendingKeywords) {
		this.trendingKeywords = trendingKeywords;
	}

	public Map<String,TrendingKeyword> getTrendingKeywords() {
		return trendingKeywords;
	}

	public void setTrendingKeywords(HashMap<String,TrendingKeyword> trendingKeywords) {
		this.trendingKeywords = trendingKeywords;
	}
	
	public boolean analyseReview(String reviewContent,Double averageRating){
		TrendingKeyword trending= null; String keyword = null;
		for(String key : reviewContent.split(" ")){
			keyword = key.replaceAll("[^a-zA-Z0-9$+]", "");
			if(keyword.length() <4) continue;
			trending = new TrendingKeyword(keyword, 1, averageRating);
			if(this.trendingKeywords.containsKey(keyword.toLowerCase())){
				trending = this.trendingKeywords.get(keyword.toLowerCase());
				trending.setCount(trending.getCount()+1);
				trending.setAverageRating((averageRating+trending.getAverageRating())/2);
			
			}else{
				this.trendingKeywords.put(keyword.toLowerCase(),trending);
			}
			
		}
		return true;
	}

	public Map<String,Object> getTrendingMap(){
		return RMUtil.getMap(this);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientUserName == null) ? 0 : clientUserName.hashCode());
		result = prime * result + ((trendingKeywords == null) ? 0 : trendingKeywords.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Trending other = (Trending) obj;
		if (clientUserName == null) {
			if (other.clientUserName != null)
				return false;
		} else if (!clientUserName.equals(other.clientUserName))
			return false;
		if (trendingKeywords == null) {
			if (other.trendingKeywords != null)
				return false;
		} else if (!trendingKeywords.equals(other.trendingKeywords))
			return false;
		return true;
	}
	
	
	
	
	
}
