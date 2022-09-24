import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string=""
  password:string=""
  httpc:any;
  sender:any;
  errormessage:string =""

  constructor(private router:Router,http : HttpClient) 
  { 
    this.httpc=http;
  }

   login()
  {
    let response=this.httpc.get("http://localhost:8080/getLogin?accholdername="+this.username+"&&password="+this.password,{responseType : 'text' as 'json'});
    response.subscribe((data:any)=>{
      if(data!="")
      {
        this.sender=data;
        localStorage.setItem("username",""+this.username);
        localStorage.setItem("sender",data);
        this.router.navigate(['customer']);
      }
      else
      {
        this.errormessage="bad credential";

      }
    });
  }
  ngOnInit(): void {
  }

}
