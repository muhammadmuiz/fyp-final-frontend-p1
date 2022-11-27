import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fyp-v1';
  
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router
    ) {
    
  }
  ngOnInit() {
    
  }
}