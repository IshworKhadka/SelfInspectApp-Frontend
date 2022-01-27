import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAboutComponent } from './house-about.component';

describe('HouseAboutComponent', () => {
  let component: HouseAboutComponent;
  let fixture: ComponentFixture<HouseAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
