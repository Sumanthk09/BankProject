package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;



@Entity
public class CustomerDetails {



   @Id
    String cid;
    String accholdername;
    String email;
    String password;
    String BIC;
    String balance;
    String OD;
    String bankname;
    public CustomerDetails(String cid, String accholdername, String email, String password, String bIC, String balance,
            String oD, String bankname) {
        super();
        this.cid = cid;
        this.accholdername = accholdername;
        this.email = email;
        this.password = password;
        BIC = bIC;
        this.balance = balance;
        OD = oD;
        this.bankname = bankname;
    }
    public CustomerDetails() {
        super();
        // TODO Auto-generated constructor stub
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
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
    @Override
    public String toString() {
        return "CustomerDetails [cid=" + cid + ", accholdername=" + accholdername + ", email=" + email + ", password="
                + password + ", BIC=" + BIC + ", balance=" + balance + ", OD=" + OD + ", bankname=" + bankname + "]";
    }
    
    
}