import { HttpClient } from '@angular/common/http';

import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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


   constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private http:HttpClient
  ) {
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

  logout() {
    return this.afAuth.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['phone']);
      });
    });
  }

}
