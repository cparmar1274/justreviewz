package org.reviewmanager.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.BSONObject;
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

@Service
public class ReviewNotificationService {

	@Autowired
	public MongoService mongoService;
	
	
	public Map<String,Object> addNotification(Notification notification){
		Map<String,Object> data = new HashMap<String,Object>();
		notification.setRead(false);
		BasicDBObject dbObject = new BasicDBObject(notification.getMap());
		WriteResult result= mongoService.addObject(RMUtil.NOTIFICATION_INDEX, dbObject, dbObject);
		data.put("result", result);
		return data;
	}
	
	public List<Notification> getNotificatoin(String userName){
		BasicDBObject dbObject = new BasicDBObject().append("clientUserName", userName);
		DBCursor cursor = mongoService.getObject(RMUtil.NOTIFICATION_INDEX, dbObject);
		List<Notification> nofitications = new ArrayList<Notification>();
		Notification notification = null;
		Gson gosn = new Gson();
		
		cursor.sort(new BasicDBObject().append("notificationTime", -1));
		
		for(DBObject dbObj : cursor.toArray()){
			notification = gosn.fromJson(dbObj.toString(), Notification.class);
			notification.setNotificationId(String.valueOf(dbObj.toMap().get("_id")));
			nofitications.add(notification);
		}
		return nofitications;
	}
	
	public Map<String,Object> markAsRead(String notificationId){
		Map<String,Object> data = new HashMap<String,Object>();
		BasicDBObject searchQuery = new BasicDBObject().append("_id", new ObjectId(notificationId));
		DBCursor cursor = mongoService.getObject(RMUtil.NOTIFICATION_INDEX, searchQuery);
		Gson gosn = new Gson();
		
		for(DBObject dbObj : cursor.toArray()){
			Notification notification = gosn.fromJson(dbObj.toString(), Notification.class);
			notification.setRead(true);
			WriteResult result= mongoService.addObject(RMUtil.NOTIFICATION_INDEX, searchQuery, new BasicDBObject(notification.getMap()));
			data.put("result", result);
		}
		return data;
	}
	
}
