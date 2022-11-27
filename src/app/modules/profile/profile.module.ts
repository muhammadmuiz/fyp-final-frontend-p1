import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// angular material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Comp
import { DashComponent } from './dash/dash.component';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  {
    path: '', component: DashComponent
  },
];


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
  providers: [ ]
})
export class ProfileModule { }
