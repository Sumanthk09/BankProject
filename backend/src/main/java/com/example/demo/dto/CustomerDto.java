package com.example.demo.dto;

public class CustomerDto 
{
    String cid;
    String accholdername;
    String BIC;
    String balance;
    String OD;
    String bankname;
	public CustomerDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CustomerDto(String cid, String accholdername, String bIC, String balance, String oD, String bankname) {
		super();
		this.cid = cid;
		this.accholdername = accholdername;
		BIC = bIC;
		this.balance = balance;
		OD = oD;
		this.bankname = bankname;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getAccholdername() {
		return accholdername;
	}
	public void setAccholdername(String accholdername) {
		this.accholdername = accholdername;
	}
	public String getBIC() {
		return BIC;
	}
	public void setBIC(String bIC) {
		BIC = bIC;
	}
	public String getBalance() {
		return balance;
	}
	public void setBalance(String balance) {
		this.balance = balance;
	}
	public String getOD() {
		return OD;
	}
	public void setOD(String oD) {
		OD = oD;
	}
	public String getBankname() {
		return bankname;
	}
	public void setBankname(String bankname) {
		this.bankname = bankname;
	}
    

}
