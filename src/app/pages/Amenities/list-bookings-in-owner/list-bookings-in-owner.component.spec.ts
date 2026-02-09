import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsInOwnerComponent } from './list-bookings-in-owner.component';

describe('ListBookingsInOwnerComponent', () => {
  let component: ListBookingsInOwnerComponent;
  let fixture: ComponentFixture<ListBookingsInOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBookingsInOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBookingsInOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
