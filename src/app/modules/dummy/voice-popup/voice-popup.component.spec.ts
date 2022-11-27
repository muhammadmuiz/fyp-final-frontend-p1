import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicePopupComponent } from './voice-popup.component';

describe('VoicePopupComponent', () => {
  let component: VoicePopupComponent;
  let fixture: ComponentFixture<VoicePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoicePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
