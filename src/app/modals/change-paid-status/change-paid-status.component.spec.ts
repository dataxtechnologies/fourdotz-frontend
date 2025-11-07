import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaidStatusComponent } from './change-paid-status.component';

describe('ChangePaidStatusComponent', () => {
  let component: ChangePaidStatusComponent;
  let fixture: ComponentFixture<ChangePaidStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePaidStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePaidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
