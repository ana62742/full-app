import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffingUpComponent } from './staffing-up.component';

describe('StaffingUpComponent', () => {
  let component: StaffingUpComponent;
  let fixture: ComponentFixture<StaffingUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffingUpComponent]
    });
    fixture = TestBed.createComponent(StaffingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
