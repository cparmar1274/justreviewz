package org.reviewmanager.service;

import java.util.List;

import org.bson.Document;
import org.reviewmanager.utility.RMUtil;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.ReplaceOptions;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

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

			String database = "review_analytics"; // the name of the database in
													// which the user is defined
			//mongodb://admin:password1@ds255857.mlab.com:55857/heroku_4rqpl385/?authSource=db1
			//mongodb://localhost:27017/?authSource=db1
			MongoClientURI uri = new MongoClientURI("mongodb://admin:password1@ds255857.mlab.com:55857/heroku_4rqpl385?authSource=db1");
			mongoClient = new MongoClient(uri);
			mongoDB = mongoClient.getDatabase(database);
			// create Index
			mongoDB.getCollection(RMUtil.REVIEW_INDEX).createIndex(new BasicDBObject().append("reviewContent", "text"));
		} catch (Exception ex) {
			System.out.println("MongoDB not started. " + ex.getMessage());
		}
	}

	/**
	 * Adds the object.
	 *
	 * @param tableName
	 *            the table name
	 * @param searchQuery
	 *            the search query
	 * @param document
	 *            the document
	 * @return the write result
	 */
	public UpdateResult addObject(String tableName, BasicDBObject searchQuery, BasicDBObject document) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
		ReplaceOptions updateOption = new ReplaceOptions().upsert(true);
		return mongoTable.replaceOne(this.convertBasicDBObject(searchQuery), this.convertBasicDBObject(document), updateOption);
	}

	public List<Document> getObject(String tableName, BasicDBObject searchQuery, BasicDBObject sort) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
		return Lists.newArrayList(mongoTable.find(this.convertBasicDBObject(searchQuery)).sort(this.convertBasicDBObject(sort)).iterator());
	}

	/**
	 * Delete object.
	 *
	 * @param tableName
	 *            the table name
	 * @param searchQuery
	 *            the search query
	 * @return the write result
	 */
	public DeleteResult deleteObject(String tableName, BasicDBObject searchQuery) {
		MongoCollection<Document> mongoTable = mongoDB.getCollection(tableName);
		return mongoTable.deleteOne(this.convertBasicDBObject(searchQuery));
	}

	private Document convertBasicDBObject(BasicDBObject object){
		if(object==null)return null;
		Document document = new Document();
		document.putAll(object.toMap());
		return document;
	}
}
