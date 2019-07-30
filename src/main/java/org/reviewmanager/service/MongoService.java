package org.reviewmanager.service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.reviewmanager.utility.RMUtil;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;


// TODO: Auto-generated Javadoc
/**
 * The Class MongoService.
 */
@Service
public class MongoService {

	/** The mongo client. */
	public MongoClient mongoClient;

	/** The mongo DB. */
	public MongoDatabase mongoDB;

	/**
	 * Instantiates a new mongo service.
	 */
	public MongoService() {

		try {
			
			String database = "review_analytics"; // the name of the database in which the user is defined
			MongoClientURI uri = new MongoClientURI("mongodb://localhost:27017/?authSource=db1");
			mongoClient = new MongoClient(uri);
			mongoDB = mongoClient.getDatabase(database);
			// create Index
			mongoDB.getCollection(RMUtil.REVIEW_INDEX).createIndex(new BasicDBObject().append("reviewContent", "text"));
		} catch (Exception ex) {
			System.out.println("MongoDB not started. "+ex.getMessage());
		}
	}

	/**
	 * Adds the object.
	 *
	 * @param tableName the table name
	 * @param searchQuery the search query
	 * @param document the document
	 * @return the write result
	 */
	public UpdateResult addObject(String tableName, BasicDBObject searchQuery, BasicDBObject document) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
		UpdateOptions updateOption = new UpdateOptions().upsert(true);
		return mongoTable.updateOne(searchQuery, document,updateOption);
	}

	public List<Document> getObject(String tableName, BasicDBObject searchQuery,BasicDBObject sort) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
    	 return Lists.newArrayList(mongoTable.find(searchQuery).sort(sort).iterator());
	}

	/**
	 * Delete object.
	 *
	 * @param tableName the table name
	 * @param searchQuery the search query
	 * @return the write result
	 */
	public DeleteResult deleteObject(String tableName, BasicDBObject searchQuery) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
		return mongoTable.deleteOne(searchQuery);
	}

}
