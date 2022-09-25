import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  otp!: string;
  res:String="";
  verify: any;
  // phonenumber:any;
  constructor(private router: Router, private ngZone: NgZone) {}

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );
    
    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response:any) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.res=response.user.phoneNumber;
        localStorage.setItem("phonenumber",JSON.stringify(this.res))
        
        this.ngZone.run(() => {
          if(this.res =="+916281948653" || this.res == "+919121852999" || this.res == "+917013929132")
          {
            this.router.navigate(['banker']);
          }
          else
          this.router.navigate(['customer']);
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
}
