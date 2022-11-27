import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

// service
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';

// Validators
import { WhiteSpaceValidator } from '../validators/white-space.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForms: FormGroup;
  loader;
  message;
  // for navbar
  userloggedIn;

  @ViewChild('passwordtoggler') passwordHandler;
  @ViewChild('iconEye') iconEyeHandler;

  constructor(private router: Router,
    private accountserv: AccountsService,
    public authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.loginForms = new FormGroup({
      email_username: new FormControl('', [
        Validators.required,
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });
  }

  
  // creating local storage for navbar change

  onSubmit() {
    if (this.loginForms.status == 'VALID') {
      this.accountserv.uploadLogInData(this.loginForms.value);
      setTimeout(() => {
        const message = this.accountserv.loginInfo();
        this.message = message;
        if(message == "Record Found. You can Logged In Now") {
          this.loader = true;
          setTimeout(() => {
            localStorage.setItem("username-login",  this.loginForms.value.email_username);
            this.router.navigate(['profile']);
            console.log(this.loginForms.value.email_username);
            this.userloggedIn = true;
            this.loader = false;
          }, 2000)
        }
      }, 3000)
    } else {
      console.log('Form validity not sure....');
    }
  }


 

  togglePasswordtoShow() {
    let passChecker = this.passwordHandler.nativeElement.type;
    if (passChecker == 'password') {
      this.passwordHandler.nativeElement.type = 'text';
      this.iconEyeHandler.nativeElement.className = 'fa fa-eye';
    } else {
      this.passwordHandler.nativeElement.type = 'password';
      this.iconEyeHandler.nativeElement.className = 'fa fa-eye-slash';
    }
  }

}
