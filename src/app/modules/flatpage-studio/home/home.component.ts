import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileuploadService } from '../fileupload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  shortLink: string = '';
  allowedFileUploadingComp = false;
  continueStatus = false;
  file: File = null; // Variable to store file
  loading: boolean = false; // Flag variable
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private fileUploadService: FileuploadService, 
    private router: Router 
    ) {}
  
  onChange(event) {
    this.file = event.target.files[0];
  }

  onContinue() {
    this.continueStatus = true;
    console.log('Continue..');
    console.log(this.file);
    if (this.file.type !== 'application/pdf') {
      this.continueStatus = false;
      this.allowedFileUploadingComp = false;
      this.file = null;
      this.fileInput.nativeElement.value = '';
      alert('Please upload pdf');
      setTimeout(() => {
        this.file = null;
      }, 3000);
    } else {
      this.allowedFileUploadingComp = true;
    }
  }

  clearSelect() {
    console.log('File is empty');
    // if(this.allowedFileUploadingComp) {
    this.allowedFileUploadingComp = false;
    this.file = null;
    this.fileInput.nativeElement.value = '';
    this.continueStatus = false;
  }

  goBack() {
    this.continueStatus = !this.continueStatus;
    this.allowedFileUploadingComp = !this.allowedFileUploadingComp;
    console.log('Go back called');
    console.log(this.file.name);
    // console.log(this.fileInput.nativeElement);
    this.fileInput.nativeElement.name = this.file.name;
  }
  
  // Continue to speech rec component
  onUpload() {
    console.log('Uploading..');
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
    this.router.navigate(['/flatpage/speechai']);
  }

}
