import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-starter-page',
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css']
})
export class StarterPageComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  // openDialogForm() {
  //   this.router.navigate(['/uploadbook'],  {relativeTo: this.activatedRoute});
  // }
}
