package org.reviewmanager.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.reviewmanager.pojo.Notification;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;
import com.mongodb.client.result.UpdateResult;

// TODO: Auto-generated Javadoc
/**
 * The Class ReviewNotificationService.
 */
@Service
public class ReviewNotificationService {

	/** The mongo service. */
	@Autowired
	public MongoService mongoService;

	/**
	 * Adds the notification.
	 *
	 * @param notification the notification
	 * @return the map
	 */
	public Map<String, Object> addNotification(Notification notification) {
		Map<String, Object> data = new HashMap<String, Object>();
		notification.setRead(false);
		BasicDBObject dbObject = new BasicDBObject(notification.getMap());
		UpdateResult result = mongoService.addObject(RMUtil.NOTIFICATION_INDEX, dbObject, dbObject);
		data.put("result", result);
		return data;
	}

	/**
	 * Gets the notificatoin.
	 *
	 * @param userName the user name
	 * @return the notificatoin
	 */
	public List<Notification> getNotificatoin(String userName) {
		BasicDBObject dbObject = new BasicDBObject().append("clientId", userName);
		List<Document> cursor = mongoService.getObject(RMUtil.NOTIFICATION_INDEX, dbObject,new BasicDBObject().append("notificationTime", -1));
		List<Notification> nofitications = new ArrayList<Notification>();
		Notification notification = null;
		Gson gosn = new Gson();
		for (Document dbObj : cursor) {
			notification = gosn.fromJson(dbObj.toString(), Notification.class);
			notification.setNotificationId(String.valueOf(dbObj.get("_id")));
			nofitications.add(notification);
		}
		return nofitications;
	}

	/**
	 * Mark as read.
	 *
	 * @param notificationId the notification id
	 * @return the map
	 */
	public Map<String, Object> markAsRead(String notificationId) {
		Map<String, Object> data = new HashMap<String, Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("_id", new ObjectId(notificationId));
		List<Document> cursor = mongoService.getObject(RMUtil.NOTIFICATION_INDEX, searchQuery,new BasicDBObject());
		Gson gosn = new Gson();

		for (Document dbObj : cursor) {
			Notification notification = gosn.fromJson(dbObj.toString(), Notification.class);
			notification.setRead(true);
			UpdateResult result = mongoService.addObject(RMUtil.NOTIFICATION_INDEX, searchQuery, new BasicDBObject(notification.getMap()));
			data.put("result", result);
		}
		return data;
	}

}
