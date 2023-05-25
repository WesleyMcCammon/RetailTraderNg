import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertChipComponent } from './alert-chip.component';

describe('AlertChipComponent', () => {
  let component: AlertChipComponent;
  let fixture: ComponentFixture<AlertChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertChipComponent]
    });
    fixture = TestBed.createComponent(AlertChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
