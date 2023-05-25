import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAskComponent } from './bid-ask.component';

describe('BidAskComponent', () => {
  let component: BidAskComponent;
  let fixture: ComponentFixture<BidAskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidAskComponent]
    });
    fixture = TestBed.createComponent(BidAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
