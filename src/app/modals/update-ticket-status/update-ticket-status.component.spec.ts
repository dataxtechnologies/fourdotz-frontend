import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketStatusComponent } from './update-ticket-status.component';

describe('UpdateTicketStatusComponent', () => {
  let component: UpdateTicketStatusComponent;
  let fixture: ComponentFixture<UpdateTicketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTicketStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
