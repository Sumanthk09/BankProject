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
  receiver:string="ANANTHAMURTHY SHAMASUNDARA";// from html input
  amount:string="100000"; // from html input (after integrating take out these default values)
  sendertransactions:any;
  ispresent:string=""
  data1:any;
  httpc:any
  blacklist:any;
  sender:any;
  accdetails:any
  accdetails1:any
  sender1:any;


  getsendertransactions()
  {
    let response = this.httpc.get("http://localhost:8080/getUserTransactions?sender="+this.receiver)
    response.subscribe((data:any)=>{
      this.sendertransactions=data;
      console.log(data);
    })
  }


  getsenderdetails()
  {
    this.accdetails=localStorage.getItem("sender")
    this.accdetails1=JSON.parse(this.accdetails);
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
          //console.log(this.sender1)
          // this.sender=localStorage.getItem("sender")
          // this.sender1=JSON.parse(this.sender);
          // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
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
   }

  ngOnInit(): void {
  }

}
