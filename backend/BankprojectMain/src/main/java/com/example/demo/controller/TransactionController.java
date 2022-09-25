package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TransactionDto;
import com.example.demo.model.TransactionDetails;
import com.example.demo.service.TransactionService;


@RestController
@CrossOrigin(value="*")
public class TransactionController 
{
	@Autowired
	TransactionService rs;
	
	@RequestMapping(value="/transaction", method = RequestMethod.PUT)
	public String Transaction(@RequestParam String senderaccholdername,@RequestParam String recieverraccholdername,String amount,String inblacklist)
	{
		return rs.makeTransaction(senderaccholdername,recieverraccholdername,amount,inblacklist);
	}
	
	
	@GetMapping("/getUserTransactions")    //sending transactions to account holder
    public List<TransactionDto> getUserTrans(@RequestParam String sender){
        return rs.getUserTrans(sender);
    }
	
	
	@GetMapping("/getPendingStatus")
    public List<TransactionDetails> getPendingStatus()
    {
        return rs.getPendingStatus("Transaction Pending");
    }
	
	@GetMapping("/getBlackListTransactions")
    public List<TransactionDetails> getBlacList(){
        return rs.getBlackListDetails("yes");
    }
	
	@PutMapping("/updatependingstatus")
	public String updatestatus(@RequestParam String tid)
	{
		return rs.updatependingstatus(tid);
	}
	
	
	@GetMapping("/isblacklist")
	public String inblacklist(@RequestParam String receiver)
	{
		return rs.blacklist(receiver);
	}
	
	@GetMapping("/getReceiver")
    public String checkReceiver(@RequestParam String receiver) {
        return rs.checkReceiver(receiver);
    }
}
