import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// ref component
import { DummyComponent } from '../dummy/dummy.component';


declare let google: any; //declare moment

@Component({
  selector: 'app-language-translate',
  templateUrl: './language-translate.component.html',
  styleUrls: ['./language-translate.component.css']
})
export class LanguageTranslateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DummyComponent>) { }

  ngOnInit(): void {
  }

  // auto translate
  aiTranslate() {

  }

  googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
          pageLanguage: 'en'
        },
        'google_translate_element'
    );
  }
  
}