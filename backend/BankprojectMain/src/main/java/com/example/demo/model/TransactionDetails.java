package com.example.demo.model;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class TransactionDetails {



	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
    String tid;
    String transactionamount;
    String sender;
    String receiver;
    Date date;
    Time time;
    String inblacklist;
    String status="pending...";
    
    
	public TransactionDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public TransactionDetails(String tid, String transactionamount, String sender, String receiver, Date date,
			Time time, String inblacklist, String status) {
		super();
		this.tid = tid;
		this.transactionamount = transactionamount;
		this.sender = sender;
		this.receiver = receiver;
		this.date = date;
		this.time = time;
		this.inblacklist = inblacklist;
		this.status = status;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getTransactionamount() {
		return transactionamount;
	}
	public void setTransactionamount(String transactionamount) {
		this.transactionamount = transactionamount;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Time getTime() {
		return time;
	}
	public void setTime(Time time) {
		this.time = time;
	}
	public String getInblacklist() {
		return inblacklist;
	}
	public void setInblacklist(String inblacklist) {
		this.inblacklist = inblacklist;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
    
}