import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userData: any;
  userTransactions:any;
  sendertransactions: any;
  accholdername: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private http:HttpClient
  ) {
    this.accholdername=localStorage.getItem("accholdername")
    console.log(this.accholdername)
    // this.accholdername=JSON.parse(this.accholdername)
    let response = this.http.get("http://localhost:8080/getUserTransactions?sender="+this.accholdername)
    response.subscribe((data:any)=>{
      this.sendertransactions=data;
      this.userTransactions=this.sendertransactions
      console.log("Transactions:"+data);
      localStorage.setItem("sendertransactions",data)
    })
  }

  ngOnInit() {
    var data = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userData = data.user.phoneNumber;
    console.log(this.userData);
    this.userTransactions=localStorage.getItem("sendertransactions")
    this.userTransactions=JSON.parse(this.userTransactions)
    console.log(this.userTransactions)
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['phone']);
      });
    });
  }
}
