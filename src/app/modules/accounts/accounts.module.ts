import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

// angular material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

// services
import { AccountsService } from './services/accounts.service';
import { AuthService } from './services/auth.service';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'home', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgetpasswordComponent,
    LandingpageComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,MatProgressSpinnerModule ],
  providers: [AccountsService, AuthService]

})
export class AccountsModule { }
