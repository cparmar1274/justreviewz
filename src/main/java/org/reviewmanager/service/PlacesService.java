package org.reviewmanager.service;

import java.io.File;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.reviewmanager.pojo.PlaceObject;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

// TODO: Auto-generated Javadoc
/**
 * The Class PlacesService.
 */
@Service
public class PlacesService {

	/** The places. */
	public List<PlaceObject> places = new ArrayList<>();

	/**
	 * Instantiates a new places service.
	 */
	public PlacesService() {
		super();
		String filePath = this.getClass().getClassLoader().getResource("places.json").getFile();
		Gson gson = new Gson();
		Type listType = new TypeToken<ArrayList<PlaceObject>>() {
		}.getType();
		try {
			places = gson.fromJson(FileUtils.readFileToString(new File(filePath), "UTF-8"), listType);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Gets the places.
	 *
	 * @param query
	 *            the query
	 * @return the places
	 */
	@Cacheable("justreviewz_places")
	public Map<String, Object> getPlaces(String query) {
		Map<String, Object> data = new HashMap<>();
		if (!query.equalsIgnoreCase("GJ6BPALL1274"))
			data.put("businesses",
					places.stream().filter(obj -> obj.toString().toLowerCase().contains(query.trim().toLowerCase()))
							.collect(Collectors.toList()));
		else
			data.put("businesses", places);
		return data;
	}

}
