import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

// Services
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  loader;

  // forget password form
  forgetpasswordForms: FormGroup;
  
  message;
  

  // reset pass form
  resetpasswordForms: FormGroup;

  submitted: boolean = false;
  @ViewChild('iconEye') iconEyeHandler;
  @ViewChild('iconEye2') iconEyeHandler2;
  @ViewChild('passwordtoggler') passwordHandler;
  @ViewChild('passwordtoggler2') passwordHandler2;

  constructor(private accountserv: AccountsService, private router: Router) { }

  ngOnInit(): void {

    // forget password form
    this.forgetpasswordForms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    // reset password form
    this.resetpasswordForms = new FormGroup({
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
        })

  }

  onSubmit() {
    if (this.forgetpasswordForms.status == 'VALID') {
        this.accountserv.uploadForgetPasswordData(this.forgetpasswordForms.value);
        setTimeout(() => {
          const message = this.accountserv.forgetPasswordInfo();
          this.message = message;
          if(message == 'Email Found') {
            this.loader = true;
            setTimeout( () => {
              let permission = this.accountserv.changeViewData();
              this.submitted = permission;
              this.loader = false;
            }, 2000)
          }
        }, 3000)
    } else {
      alert('Failed');
    }
  }

  onSubmit2() {
    if (this.resetpasswordForms.status == 'VALID') {
      this.accountserv.uploadResetPasswordData(this.resetpasswordForms.value);
      alert('Success');
      this.loader = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
        this.loader = false;
      }, 2000)
    } else {
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

}
