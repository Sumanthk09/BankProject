package com.example.demo.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.CustomerDetails;

import com.example.demo.repo.CustomerRepo;


@Service
public class CustomerService 
{
	@Autowired
	CustomerRepo cr;

	public CustomerDto getcustomers(String accholdername) 
	{
		CustomerDetails cd = cr.findByAccholdername(accholdername);
		if(cd!=null)
		{
			CustomerDto customer=new CustomerDto(cd.getCid(),cd.getAccholdername(),cd.getBIC(),cd.getBalance(),cd.getOD(),cd.getBankname());
			return customer;
		}
		return null;
		
	}
	public CustomerDto getDetails(String accholdername,String password) {
        System.out.println("Entered the getDetails");
        CustomerDetails cd = cr.findByAccholdername(accholdername);
        if((cd!=null) && (cd.getPassword().equals(password))) {
            return new CustomerDto(cd.getCid(),cd.getAccholdername(),cd.getBIC(),cd.getBalance(),cd.getOD(),cd.getBankname());
        }
        return null;
    }

}
