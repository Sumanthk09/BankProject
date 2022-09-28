package com.example.demo.controller;
import com.example.demo.dto.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.CustomerDetails;
import com.example.demo.service.CustomerService;

@RestController
@CrossOrigin("*")
public class CustomerController 
{
	@Autowired
	CustomerService cs;
	
	
	@GetMapping("/getcustomer")
	public CustomerDetails getcustomerdetails(@RequestParam String accholdername)
	{
		return cs.getcustomers(accholdername);
	}
	@GetMapping("/getLogin")
    public CustomerDto getDetails(@RequestParam String accholdername,@RequestParam String password) {
        return cs.getDetails(accholdername,password);
    }
	@GetMapping("/getbyphone")
    public CustomerDetails getbyphone(@RequestParam String phonenumber) {
        return cs.getByPhone(phonenumber);
    }
	
}
