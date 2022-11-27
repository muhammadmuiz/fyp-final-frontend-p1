import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookData } from '../../accounts/data/bookData';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  
  username;
  allUserData;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('username-login')) {
      this.username = localStorage.getItem('username-login');
       // getting data of that username 
       setTimeout(() => {
        this.http
        .get('http://localhost:3000/users')
        .subscribe((users: FormData[]) => {
          console.log(users)
          for(let i = 0; i < users.length; i++) {
            if(users[i]['username'] == localStorage.getItem('username-login') || users[i]['email'] == localStorage.getItem('username-login')) {
              // let currentuser = users[i]['books'];
              // this.allUserData = currentuser;
              console.log('Bookss ' + users[i]['books'])
              this.allUserData = users[i]['books'];
              this.id = users[i]['id'];
              
            }  
          }
        })
      }, 3000)
    }

    else if(localStorage.getItem('username-signup')) {
     this.username = localStorage.getItem('username-signup');
      // getting data of that username 
      setTimeout(() => {
        this.http
        .get('http://localhost:3000/users')
        .subscribe((users: FormData[]) => {
          this.allUserData = users[localStorage.getItem('username-signup')];
          console.log('Entire data: ' + users[localStorage.getItem('username-signup')]);
        })
      }, 6000)
    }

    else {
      console.log('Nothing');
    }
  }

  deleteProject(data, index) {
    
    console.log('A ' + JSON.stringify(this.allUserData));
    
    this.allUserData = this.allUserData.filter(item => item !== data);
    
    console.log('B '+ JSON.stringify(this.allUserData));

    this.http
    .put('http://localhost:3000/users/' + this.id, this.allUserData) 
    .subscribe(() => {
      console.warn('Done')
    })
    // this.http
    // .delete('http://localhost:3000/books/' + index)
    // .subscribe(
    //   () => {
    //     console.warn('After delete ' + this.allUserData);
    //     console.warn('Delete successful');
    //   }
    //   );




    // for(let i = 0; i < this.allUserData.length; i++) {
    //   this.allUserData[index] = this.allUserData[index + i];
    //   // this.allUserData[index] = null;
    // }
  }
}

// "books": [
//   {
//   "id": 0,
//     "book": [ 
//       {
//       "name": "Jason Roy",
//       "createdOn": "9 Nov 2019"
//     },
//     {
//       "name": "Haydenn",
//       "createdOn": "9 Nov 2019"
//     }
//     ]
//   }
// ],