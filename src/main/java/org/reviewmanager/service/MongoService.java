package org.reviewmanager.service;

import org.reviewmanager.utility.RMUtil;
import org.springframework.stereotype.Service;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;

@Service
public class MongoService {

	public MongoClient mongoClient;
	
	public DB mongoDB;
	
	public MongoService(){
		MongoClientURI mongoURI = new MongoClientURI("mongodb://ds163300.mlab.com:63300");
		mongoClient =  new MongoClient(mongoURI);
		mongoDB = mongoClient.getDB("review_analytics");
		
		//create Index
		mongoDB.getCollection(RMUtil.REVIEW_INDEX).createIndex(new BasicDBObject().append("reviewContent", "text"));
	}
	
	public WriteResult addObject(String tableName,DBObject searchQuery,DBObject document){
		DBCollection mongoTable =	mongoDB.getCollection(tableName);
		return mongoTable.update(searchQuery, document, true, false);
	}
	
	public DBCursor getObject(String tableName,DBObject searchQuery){
		DBCollection mongoTable =	mongoDB.getCollection(tableName);
		return  mongoTable.find(searchQuery);
	}
	
	public WriteResult deleteObject(String tableName,DBObject searchQuery) {
		DBCollection mongoTable =	mongoDB.getCollection(tableName);
		return mongoTable.remove(searchQuery);
	}
	
}
