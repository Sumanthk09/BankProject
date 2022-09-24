import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.css']
})
export class BankerComponent implements OnInit 
{
  httpc:any;
  pendingTransactions:any;
  getpendingtransactions()
  {
      let response=this.httpc.get("http://localhost:8080/getPendingStatus");
      response.subscribe((data:any)=>{
        this.pendingTransactions=data
        console.log(data)
      })
  }

  constructor(private router:Router,private http:HttpClient) {
    this.httpc=http;
    this.getpendingtransactions()
   }

   changestatuspendingtransactions(tid:string)
   {
      let response=this.httpc.put("http://localhost:8080/updatependingstatus?tid="+tid,{responseType : 'text' as 'json'});
      response.subscribe((data:string)=>{
        console.log(data);
      })
   }
  ngOnInit(): void {
  }

}
