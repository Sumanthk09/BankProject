package com.example.demo.service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.TransactionDto;
import com.example.demo.model.CustomerDetails;
import com.example.demo.model.TransactionDetails;
import com.example.demo.repo.CustomerRepo;
import com.example.demo.repo.TransactionRepo;
import com.example.demo.repo.blackList;

@Service
public class TransactionService 
{
	@Autowired
	TransactionRepo tr;
	
	@Autowired
	CustomerRepo cr;
	
	@Autowired
	blackList bl;

	//updates account details after transaction
	 public String makeTransaction(String senderaccholdername, String recieverraccholdername, String amount, String inblacklist)
	    {
	        Date d= new Date(System.currentTimeMillis());
	        long now = System.currentTimeMillis();
	        Time t=new Time(now);
	        
	        if(inblacklist.equals("no")&& Long.valueOf(amount)<500000 )
	        {
	        
	        //Amountlogic
	        CustomerDetails sender=cr.findByAccholdername(senderaccholdername);
	        CustomerDetails reciever=cr.findByAccholdername(recieverraccholdername);
	        //System.out.println(sender.getBalance()+" "+amount);
	        long afterDeductionBalanace=Long.valueOf(sender.getBalance())- Long.valueOf(amount);
	        //System.out.println(sender.getBalance()+" "+amount);
	        sender.setBalance(String.valueOf(afterDeductionBalanace));
	        long afterReceivingAmount=Long.valueOf(reciever.getBalance())+Long.valueOf(amount);
	        reciever.setBalance(String.valueOf(afterReceivingAmount));
	        
	        
	        cr.save(sender);
	        cr.save(reciever);
	        
	        //Storing it in transaction repository
	        TransactionDetails transaction=new TransactionDetails();
	        String randomstring=usingRandomUUID();
	        transaction.setTid(randomstring);
	        transaction.setTransactionamount(amount);
	        transaction.setSender(senderaccholdername);
	        transaction.setReceiver(recieverraccholdername);
	        transaction.setDate(d);
	        transaction.setTime(t);
	        transaction.setInblacklist(inblacklist);
	        transaction.setStatus("Transaction Successful");
	        tr.save(transaction);
	        return "{\"value\":\"success\"}";
	        //return "{success}";
	    }
	    else if(inblacklist.equals("no")&& Long.valueOf(amount)>500000 ){
	        TransactionDetails transaction=new TransactionDetails();
	        String randomstring=usingRandomUUID();
	        transaction.setTid(randomstring);
	        transaction.setTransactionamount(amount);
	        transaction.setSender(senderaccholdername);
	        transaction.setReceiver(recieverraccholdername);
	        transaction.setDate(d);
	        transaction.setTime(t);
	        transaction.setInblacklist(inblacklist);
	        transaction.setStatus("Transaction Pending");
	        tr.save(transaction);
	        //return "{pending}";
	        return "{\"value\":\"pending\"}";
	        }
	        else
	        {
	        
	        TransactionDetails transaction=new TransactionDetails();
	        String randomstring=usingRandomUUID();
	        transaction.setTid(randomstring);
	        transaction.setTransactionamount(amount);
	        transaction.setSender(senderaccholdername);
	        transaction.setReceiver(recieverraccholdername);
	        transaction.setDate(d);
	        transaction.setTime(t);
	        transaction.setInblacklist(inblacklist);
	        transaction.setStatus("Process...");
	        tr.save(transaction);
	        //return "{process}";
	        return "{\"value\":\"process\"}";
	        }
	        
	    }
	
	
	  public String usingRandomUUID()
	  {

		    UUID randomUUID = UUID.randomUUID();

		    return randomUUID.toString().replaceAll("_", "");

	  }
	  
	  //gets transactions of sender
	  public List<TransactionDto> getUserTrans(String sender) {
	        
	        List<TransactionDetails> tdetails = tr.findBySender(sender);
	        List<TransactionDto> tList = new ArrayList<>();
	        if(tdetails.size()!=0)
	        {
	        for(int i=0;i<tdetails.size();i++) 
	        {
	            tList.add(new TransactionDto(tdetails.get(i).getTid(),tdetails.get(i).getTransactionamount(),
	                    tdetails.get(i).getSender(),tdetails.get(i).getReceiver(),tdetails.get(i).getDate(),
	                    tdetails.get(i).getTime(),tdetails.get(i).getStatus())
	            		);
	        }
	        return tList;
	        }
	        return null;
	    }


	public List<TransactionDetails> getBlackListDetails(String blackStatus) 
	{
		 return tr.findByInblacklist(blackStatus);
	}


	//Check receiver
    public String checkReceiver(String receiver) {
        CustomerDetails custDetails = cr.findByAccholdername(receiver);
        if(custDetails!=null)
            return "yes";
        return "no";
    }


	public List<TransactionDetails> getPendingStatus(String status) {
		return tr.findByStatus(status);
	}


	public String updatependingstatus(String tid) 
	{
		TransactionDetails td=tr.findByTid(tid);
		td.setStatus("Transaction Succesfull");
		System.out.println(td);
		tr.save(td);

        CustomerDetails sender=cr.findByAccholdername(td.getSender());
        CustomerDetails reciever=cr.findByAccholdername(td.getReceiver());
       
        long afterDeductionBalanace=Long.valueOf(sender.getBalance())- Long.valueOf(td.getTransactionamount());
        
        sender.setBalance(String.valueOf(afterDeductionBalanace));
        long afterReceivingAmount=Long.valueOf(reciever.getBalance())+Long.valueOf(td.getTransactionamount());
        reciever.setBalance(String.valueOf(afterReceivingAmount));
        
        
        cr.save(sender);
        cr.save(reciever);
        //return "success";
        return "{\"value\":\"success\"}";
	}


	public String blacklist(String receiver) 
	{
		return bl.findByName(receiver)==null?"no":"yes";
	}


}
