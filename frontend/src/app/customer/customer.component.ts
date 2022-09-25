import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit 
{
  receiver:string="";// from html input
  amount:string=""; // from html input (after integrating take out these default values)
  sendertransactions:any;
  ispresent:string=""
  data1:any;
  httpc:any
  blacklist:any;
  sender:any;
  accdetails:any
  accdetails1:any
  sender1:any;
  senderinfo:any;
  senderinfo1:any;
  phonenumber: any;
  res:any;
  r: any

  getsendertransactions()
  {
    
    let response = this.httpc.get("http://localhost:8080/getUserTransactions?sender="+this.senderinfo)
    response.subscribe((data:any)=>{
      this.sendertransactions=data;
      console.log(data);
    })
  }

  

  getSenderDetails()
  {
    let response = this.httpc.get("http://localhost:8080/getcustomer?sender="+this.senderinfo)
    response.subscribe((data:any)=>{
      // this.sendertransactions=data;
      console.log(data);
    })
  }




  getsenderName()
  {
    // this.accdetails=localStorage.getItem("sender")
    // this.accdetails1=JSON.parse(this.accdetails);
    this.phonenumber= localStorage.getItem("phonenumber")
    console.log(this.phonenumber)
    // this.phonenumber="+916304105860"
    let response = this.httpc.get("http://localhost:8080/getbyphone?phonenumber="+this.phonenumber)
    response.subscribe((data:any)=>{
      this.senderinfo=data;
      localStorage.setItem("senderinfo1",data);
      console.log(data);
    })
  }


  inblacklist()
  {
    let response = this.httpc.get("http://localhost:8080/isblacklist?receiver="+this.receiver,{responseType:'text' as 'json'})
    response.subscribe((data:string)=>{
      localStorage.setItem("blacklist",data);
    })
  }


  isreceiverpresent()
  {
    let response=this.httpc.get("http://localhost:8080/getReceiver?receiver="+this.receiver,{responseType:'text' as 'json'})
    response.subscribe((data:string)=>{
      //console.log(typeof data)
      this.ispresent=data 
      localStorage.setItem("ispresent",this.ispresent);
    });
  }

  

  maketransaction()
  {

        this.sender=localStorage.getItem("sender")
        this.sender1=JSON.parse(this.sender);
        this.inblacklist()
        this.blacklist=localStorage.getItem("blacklist")
        this.isreceiverpresent()
        if(Number(this.sender1.balance)<Number(this.amount) && this.sender1.od=="no")
        {
            console.log("od facility is not present for ur account")
        }
        else
        {
        if(localStorage.getItem("ispresent")=="yes")
        {
          let response=this.httpc.put("http://localhost:8080/transaction?senderaccholdername="+this.sender1.accholdername as string+"&&recieverraccholdername="+this.receiver as string+"&&amount="+this.amount as string+"&&inblacklist="+this.blacklist)
          response.subscribe((data:any)=>{
            //this.data1=JSON.parse(data);
            console.log(data.value)
            //localStorage.setItem("data12",data)
          });
        }
        }

        
      
  }


  constructor(private router:Router,private http:HttpClient) 
  {
    this.httpc=http;
    //this.getsendertransactions();// give for transaction history button
    //this.maketransaction()
    this.getsenderName()
    // this.getsendertransactions()
    this.getSenderDetails()
   }

  ngOnInit(): void {
  }

}
