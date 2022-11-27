import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';


// importing Validators
import { WhiteSpaceValidator } from '../validators/white-space.validator';

// services goes..
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForms: FormGroup;
  loader;
  message;
  @ViewChild('passwordtoggler') passwordHandler;
  @ViewChild('passwordtoggler2') passwordHandler2;
  @ViewChild('iconEye') iconEyeHandler;
  @ViewChild('iconEye2') iconEyeHandler2;
  
  constructor(    
    private router: Router,
    private accountserv: AccountsService,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    // in case of reactive forms required doesn't work on html tags
    this.signupForms = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        // this.noWhitespaceValidator.bind(this),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),

      // password match purpose; Group together
      userData: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
            Validators.minLength(8),
            Validators.maxLength(30),
          ]),
          confirmpassword: new FormControl('', [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
            Validators.minLength(8),
            Validators.maxLength(30),
          ]),
        },
        {
          validators: this.passwordMatchValidator,
        }
      ),
    });
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

  togglePasswordtoShow2() {
    let passChecker = this.passwordHandler2.nativeElement.type;
    if (passChecker == 'password') {
      this.passwordHandler2.nativeElement.type = 'text';
      this.iconEyeHandler2.nativeElement.className = 'fa fa-eye';
    } else {
      this.passwordHandler2.nativeElement.type = 'password';
      this.iconEyeHandler2.nativeElement.className = 'fa fa-eye-slash';
    }
  }

  onSubmit() {
    console.log('Button pressed: UnDisabled')
    if (this.signupForms.status == 'VALID') {
      this.accountserv.uploadSignUpData(this.signupForms.value);
      setTimeout(() => {
        const message = this.accountserv.signupInfo();
        this.message = message;
        if(message == 'Email and username is in use, try another')
          {
            alert(message);
          }  
        if(message == 'Success') {
          this.loader = true;
          setTimeout( () => {
            localStorage.setItem("username-signup", this.signupForms.value.username);
            this.router.navigate(['profile']);
            this.loader = false;

          }, 2000)
        }
      }, 3000)
    }
    else {
      console.log("No response")
      alert('Failed');
    }
  }

  // Confirm password validator
  passwordMatchValidator(formGrp: FormGroup) {
    return formGrp.controls['password'].value ===
      formGrp.controls['confirmpassword'].value
      ? null
      : { mismatch: true };
  }
}
