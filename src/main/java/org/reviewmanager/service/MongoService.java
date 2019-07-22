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
import com.mongodb.client.MongoDatabase;

// TODO: Auto-generated Javadoc
/**
 * The Class MongoService.
 */
@Service
public class MongoService {

	/** The mongo client. */
	public MongoClient mongoClient;

	/** The mongo DB. */
	public DB mongoDB;

	/**
	 * Instantiates a new mongo service.
	 */
	public MongoService() {

		try {
			MongoClientURI uri = new MongoClientURI("mongodb://127.0.0.1:27017");
			mongoClient = new MongoClient(uri);
			mongoDB = mongoClient.getDB("review_analytics");
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
	public WriteResult addObject(String tableName, DBObject searchQuery, DBObject document) {
		DBCollection mongoTable = mongoDB.getCollection(tableName);
		return mongoTable.update(searchQuery, document, true, false);
	}

	/**
	 * Gets the object.
	 *
	 * @param tableName the table name
	 * @param searchQuery the search query
	 * @return the object
	 */
	public DBCursor getObject(String tableName, DBObject searchQuery) {
		DBCollection mongoTable = mongoDB.getCollection(tableName);
		return mongoTable.find(searchQuery);
	}

	/**
	 * Delete object.
	 *
	 * @param tableName the table name
	 * @param searchQuery the search query
	 * @return the write result
	 */
	public WriteResult deleteObject(String tableName, DBObject searchQuery) {
		DBCollection mongoTable = mongoDB.getCollection(tableName);
		return mongoTable.remove(searchQuery);
	}

}
