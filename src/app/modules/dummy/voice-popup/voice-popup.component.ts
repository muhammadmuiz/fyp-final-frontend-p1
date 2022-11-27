import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DummyComponent } from '../dummy/dummy.component';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-voice-popup',
  templateUrl: './voice-popup.component.html',
  styleUrls: ['./voice-popup.component.css']
})
export class VoicePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DummyComponent>,
    public service: VoiceRecognitionService,) { 
      this.service.init();
    }

  ngOnInit(): void {
  }

  // start rec
  startServer() {
    this.service.start()
  } 

  // stop server 
  stopServer() {
    this.service.stop()
  }

}
