package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class blacklist 
{
	@Id
	String id;
	String name;
	public blacklist() {
		super();
		// TODO Auto-generated constructor stub
	}
	public blacklist(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
