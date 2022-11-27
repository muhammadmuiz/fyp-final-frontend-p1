import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeecRecComponent } from './speec-rec.component';

describe('SpeecRecComponent', () => {
  let component: SpeecRecComponent;
  let fixture: ComponentFixture<SpeecRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeecRecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeecRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
