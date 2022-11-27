import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// data and data types
import { FormDataDb } from '../data/formDataDb';
import { FormData } from '../data/formData';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  MYFORMDB = FormDataDb;
  formdata: FormData;
  resetPasswordValide;
  // old passwords
  oldPasswordTrackingNumber;
  changeViewGranted = false;
  signupmessage;
  loginmessage;
  forgetpasswordmessage;
  constructor(private http: HttpClient) { }
 
  // SIGNUP DATA
  uploadSignUpData(signupForms) {
    this.http
    .get('http://localhost:3000/users')
    .subscribe((users: FormData[]) => {
      let i = 0;
      // for (let i = 0; i < users.length; i++) { 
      let test = false;
      while(i < users.length) {
        if (signupForms.email === users[i].email && signupForms.username === users[i].username) {
        this.signupmessage = 'Email and username is in use, try another';
        test = true;
        break
      }
      
      else if (signupForms.email === users[i].email) 
      {
       this.signupmessage = 'Email is already used';
       test = true;
       break
      } 
      
      else if (signupForms.username === users[i].username) {
        this.signupmessage = 'Username already Taken';
        test = true;
        break
      }
      
      i++;
    }
    if(test === false) {
      this.signupmessage = 'Success';
      this.postUser(signupForms);
    }
    })
  }

  // signupInfo msg
  signupInfo() {
    return this.signupmessage;
  }


  // post method
  postUser(data) {
    const headers = { 'content-type': 'application/json'};
    let data1 = JSON.stringify(data);
    return this.http.post('http://localhost:3000/users', data1, {'headers':headers}).subscribe(responseData => {
      console.log(responseData);
    });
  }
  

  // LOGIN DATA


  uploadLogInData(loginForms) {
    this.http
    .get('http://localhost:3000/users')
    .subscribe((users: FormData[]) => {
      let checker = false;
      for(let i = 0; i < users.length; i++) {
        if (loginForms.email_username == users[i].email || loginForms.email_username == users[i].username) 
        {
          if (loginForms.password == users[i].userData.password ) {
            this.loginmessage = "Record Found. You can Logged In Now";
            checker = true;
            break
        } 
        else {
          this.loginmessage = "Password is incorrect";
          checker = true;
          break
        } 
      }
    }
    if(checker == false) {
      this.loginmessage = "NOT FOUND";
    }
  });
}

 

  // Log-in Info msg
  loginInfo() {
    return this.loginmessage;
  }


// FORGET PASSWORD DATA
uploadForgetPasswordData(forgetPasswordForms) {
  this.http
    .get('http://localhost:3000/users')
    .subscribe((users: FormData[]) => {
      let checker2 = false;
      for (let i = 0; i < users.length; i++) {
        if(forgetPasswordForms.email === users[i].email) {
          this.forgetpasswordmessage = 'Email Found';
          this.changeViewGranted = true;
          this.oldPasswordTrackingNumber = i;
          checker2 = true;
          break;
        }
      }
      if(checker2 == false) {
        this.forgetpasswordmessage = 'Email Not Found';
       }
      this.resetPasswordValide = checker2;
    })
}

 // Log-in Info msg
 forgetPasswordInfo() {
    return this.forgetpasswordmessage;
}


// Change View permission
changeViewData() {
  return this.changeViewGranted;
}

// RESET PASSWORD DATA
uploadResetPasswordData(resetpasswordForms) {
if(this.resetPasswordValide == true) {
  // new password
  let newPassword = resetpasswordForms.password;
  let newConfirmPassword = resetpasswordForms.confirmpassword;
  this.passwordUpdated(newPassword, newConfirmPassword)
}
else {
  console.log(`Sorry you cannot reset the password for this email. As their is no such account`); 
}
}

passwordUpdated(newPassword, newConfirmPassword) {
  this.http
    .get('http://localhost:3000/users')
    .subscribe((users: FormData[]) => {
      users[this.oldPasswordTrackingNumber].userData.password = newPassword;
      users[this.oldPasswordTrackingNumber].userData.confirmpassword = newConfirmPassword;
      console.log(users[this.oldPasswordTrackingNumber])

      this.http
      .put('http://localhost:3000/users/' + this.oldPasswordTrackingNumber, users[this.oldPasswordTrackingNumber])
      .subscribe((users: FormData[]) => {
        console.log()
      })
    })
  }
}

