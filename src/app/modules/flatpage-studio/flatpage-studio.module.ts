import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FileuploadService } from './fileupload.service';

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

// Comp
import { SpeecRecComponent } from './speec-rec/speec-rec.component';
import { VoidComponent } from './void/void.component';
import { HomeComponent } from './home/home.component';
import { StarterPageComponent } from './starter-page/starter-page.component';

const routes: Routes = [
  {
    path: '', component: StarterPageComponent, 
    
  },   
  {  
    path: 'uploadbook', component: HomeComponent
  },
  {  
    path: 'speechai', component: SpeecRecComponent
  }
];



@NgModule({
  declarations: [
    HomeComponent,
    StarterPageComponent,
    SpeecRecComponent,
    VoidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,MatProgressSpinnerModule ],
  providers: [ FileuploadService ]
})
export class FlatpageStudioModule { }
