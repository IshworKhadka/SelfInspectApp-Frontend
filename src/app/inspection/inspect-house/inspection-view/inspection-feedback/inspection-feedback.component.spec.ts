import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionFeedbackComponent } from './inspection-feedback.component';

describe('InspectionFeedbackComponent', () => {
  let component: InspectionFeedbackComponent;
  let fixture: ComponentFixture<InspectionFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
