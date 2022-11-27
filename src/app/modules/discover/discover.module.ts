import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

import { DiscoverHomeComponent } from './discover-home/discover-home.component';


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

const routes: Routes = [
  { path: '', component: DiscoverHomeComponent},
];


@NgModule({
  declarations: [
    DiscoverHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,MatProgressSpinnerModule ]
})
export class DiscoverModule { }
