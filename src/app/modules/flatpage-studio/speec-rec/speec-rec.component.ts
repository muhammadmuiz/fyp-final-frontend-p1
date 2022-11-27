import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-speec-rec',
  templateUrl: './speec-rec.component.html',
  styleUrls: ['./speec-rec.component.css']
})
export class SpeecRecComponent implements OnInit {
  
  pages;
  objectKeys;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.objectKeys = Object.keys;

    const headers = { 'content-type': 'application/json'};
    // let data1 = JSON.stringify(data);
    this.http.get('http://localhost:3000/studio')
    .subscribe(responseData => {
      console.log(responseData[1].book_pages);
      this.pages = responseData[1].book_pages;
      console.log(JSON.stringify(this.pages))
    });
  }

  // create an instance of the SpeechSynthesisUtterance class
  speech = new SpeechSynthesisUtterance();

  data: string = `Hey whassup`;

  // play audio method
  playAudio() {
    this.speech.lang = 'en';
    this.speech.text = this.data;
    window.speechSynthesis.speak(this.speech);
  }

  // pause audio method
  pauseAudio() {
    window.speechSynthesis.pause();
  }

  // resume audio method
  resumeAudio() {
    window.speechSynthesis.resume();
  }

  // stop audio method
  stopAudio() {
    window.speechSynthesis.cancel();
  }

  uploadnewBook() {
    this.http.delete('http://localhost:3000/studio/1')
        .subscribe(() => console.log('1 cleared'));

    this.router.navigate(['/flatpage/uploadbook'])
  }

  loadPageContent(data){ 
    this.data = data;
    this.playAudio();
  }
}
