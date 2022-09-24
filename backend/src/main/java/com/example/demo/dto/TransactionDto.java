package com.example.demo.dto;

import java.sql.Date;
import java.sql.Time;

public class TransactionDto {



	   	String tid;
	    String transactionamount;
	    String sender;
	    String receiver;
	    Date date;
	    Time time;
	    String status;
		public TransactionDto() {
			super();
			// TODO Auto-generated constructor stub
		}
		public TransactionDto(String tid, String transactionamount, String sender, String receiver, Date date,
				Time time, String status) {
			super();
			this.tid = tid;
			this.transactionamount = transactionamount;
			this.sender = sender;
			this.receiver = receiver;
			this.date = date;
			this.time = time;
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
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
	    
	    
	    
	}