package org.reviewmanager.utility;

import java.text.ParseException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;

class Product {
	String name;

	public Product(String name) {
		super();
		this.name = name;
	}

	@Override
	public String toString() {
		return "Product [name=" + name + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		return true;
	}

}

public class Tester {

	public static void main(String[] args) throws ParseException {
		int j = 0;
		while (j <= 100) {
			System.out.println(RMUtil.generateRandomPasswordText());
			j++;
		}
	}

}
