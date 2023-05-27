import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSummaryFilterComponent } from './price-summary-filter.component';

describe('PriceSummaryFilterComponent', () => {
  let component: PriceSummaryFilterComponent;
  let fixture: ComponentFixture<PriceSummaryFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceSummaryFilterComponent]
    });
    fixture = TestBed.createComponent(PriceSummaryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
