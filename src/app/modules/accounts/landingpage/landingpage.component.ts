import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {


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
  }

  scrollDown() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

  checkForProfileNavigation() {
    if(localStorage.getItem('username-login')) {
      console.log('Username is from login ' + localStorage.getItem('username-login'))
      this.username = localStorage.getItem('username-login');
      this.loggedInStatus = true;
      this.router.navigate(['profile']);

       // getting data of that username 
       this.http
       .get('http://localhost:3000/users')
       .subscribe((users: FormData[]) => {
         this.allUserData = users[this.username];
         console.log('Entire data: ' + users[this.username]);
       })
    }

    else if(localStorage.getItem('username-signup')) {
     console.log('Username is from sign up ' + localStorage.getItem('username-signup'))
     this.username = localStorage.getItem('username-signup');
     this.loggedInStatus = true;
     this.allowedVerificationEmail = true;
     this.router.navigate(['profile']);

      // getting data of that username 
      this.http
      .get('http://localhost:3000/users')
      .subscribe((users: FormData[]) => {
        this.allUserData = users[this.username];
        console.log('Entire data: ' + users[this.username]);
      })
    }

    else {
      this.router.navigate(['login']);
    }
  }
}
