import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit ,NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  senderinfo:any="";
  senderinfo1:any;
  phonenumber: any;
  res:any;
  r: any
  xyz: any;
  phonenumber1: any
  senderdetails: any;

  getsendertransactions()
  {
    let response = this.httpc.get("http://localhost:8080/getUserTransactions?accholdername="+this.senderinfo.accholdername,{responseType:'text' as 'json'})
    response.subscribe((data:any)=>{
      this.sendertransactions=data;
      console.log("Transactoins:"+data);
      localStorage.setItem("sendertransactions",data)
    })
  }

  

  // getSenderDetails()
  // {
  //   this.senderinfo1=localStorage.getItem("senderinfo1")
  //   // this.xyz = JSON.parse(this.senderinfo1)
    
  //   console.log("Get Sender Details:"+this.senderinfo)
    
  //   let response = this.httpc.get("http://localhost:8080/getcustomer?accholdername="+this.senderinfo,{responseType:'text' as 'json'})
  //   response.subscribe((data:any)=>{
  //     // this.sendertransactions=data;
  //     localStorage.setItem("senderdetails",data);
  //     this.senderdetails=data
  //     console.log("Sender Details"+data);
  //   })
  // }


  getsenderName()
  {
    // this.accdetails=localStorage.getItem("sender")
    // this.accdetails1=JSON.parse(this.accdetails);
    this.phonenumber1= localStorage.getItem("phonenumber")
    this.phonenumber=JSON.parse(this.phonenumber1)
    console.log("Customer: Phone: "+this.phonenumber)
    // this.phonenumber="+916304105860"
    let response = this.httpc.get("http://localhost:8080/getbyphone?phonenumber="+this.phonenumber)
   
  // let response = this.httpc.get("http://localhost:8080/getbyphone?phonenumber=+918309600944",{responseType:'text' as 'json'})
    response.subscribe((data:any)=>{
      console.log("SenderName:"+data);
      this.senderinfo=data;
      localStorage.setItem("accholdername",data.accholdername);
      
    })
  }

  showusertransactionhistory()
  {
    // this.getsendertransactions()
    this.router.navigate(['dashboard'])
  }

  inblacklist()
  {
    let response = this.httpc.get("http://localhost:8080/isblacklist?receiver="+this.receiver,{responseType:'text' as 'json'})
    response.subscribe((data:string)=>{
      localStorage.setItem("blacklist",data);
      console.log("In Blacklist"+data)
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

  message:any;

  maketransaction()
  {
        this.sender=localStorage.getItem("senderdetails")
        this.sender1=JSON.parse(this.sender);
        this.inblacklist()
        this.blacklist=localStorage.getItem("blacklist")
        this.isreceiverpresent()

        if(Number(this.senderinfo.balance)<Number(this.amount) && this.senderinfo.od=="no")
        {
            console.log("od facility is not present for ur account")
            this.message="od facility is not present for ur account";
        }
        else
        {
        if(localStorage.getItem("ispresent")=="yes")
        {
          let response=this.httpc.put("http://localhost:8080/transaction?senderaccholdername="+this.senderinfo.accholdername as string+"&&recieverraccholdername="+this.receiver as string+"&&amount="+this.amount as string+"&&inblacklist="+this.blacklist)
          response.subscribe((data:any)=>{
            //this.data1=JSON.parse(data);
            console.log(data.value)
            this.message=data.value;
            //localStorage.setItem("data12",data)
          });
        }
        }
        this.ngOnInit();
        
      
  }


  constructor(private router:Router,private http:HttpClient ,private afAuth: AngularFireAuth,private ngZone: NgZone) 
  {
    this.httpc=http;
    //this.getsendertransactions();// give for transaction history button
    //this.maketransaction()
    // localStorage.removeItem("senderdetails")
    this.getsenderName()
    // this.getsendertransactions()
    // this.getSenderDetails()
    // this.senderdetails=localStorage.getItem("senderdetails")
    // console.log()
   }

  ngOnInit(): void {
  }
  logout() {
    return this.afAuth.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['phone']);
      });
    });
  }
}
