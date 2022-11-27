import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  username;
  loggedInStatus;
  
  allUserData;
  allowedVerificationEmail = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {

      if(localStorage.getItem('username-login')) {
         console.log('Username is from login ' + localStorage.getItem('username-login'))
         this.username = localStorage.getItem('username-login');
         this.loggedInStatus = true;

          // // getting data of that username 
          // this.http
          // .get('http://localhost:3000/users')
          // .subscribe((users: FormData[]) => {
          //   this.allUserData = users[this.username];
          //   console.log('Entire data: ' + users[this.username]);
          // })
       }

       else if(localStorage.getItem('username-signup')) {
        console.log('Username is from sign up ' + localStorage.getItem('username-signup'))
        this.username = localStorage.getItem('username-signup');
        this.loggedInStatus = true;
        this.allowedVerificationEmail = true;

         // getting data of that username 
        //  this.http
        //  .get('http://localhost:3000/users')
        //  .subscribe((users: FormData[]) => {
        //    this.allUserData = users[this.username];
        //    console.log('Entire data: ' + users[this.username]);
        //  })
       }

       else {
         // alert("Nothing")
         console.log('Nothing');
       }
     })
  }

  logOut() {
    if(localStorage.getItem('username-login') || localStorage.getItem('username-signup')) {
      localStorage.clear();
      this.allowedVerificationEmail = false;
      console.log('Route from logout ' + this.router.url);
     
      setTimeout(() => {
        this.loggedInStatus = false;
        if(this.router.url == '/profile') {
          this.router.navigate(['']);
        }
      }, 2000)
    } 
  }

  verifyEmailAccount() {
    // do Something
    // 1- Open email
    // 2- Click verified link
    // 3- if (verified)
    // 4- Continue to normal
  }

}


