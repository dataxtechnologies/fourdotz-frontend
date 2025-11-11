import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUPIIdComponent } from './add-upi-id.component';

describe('AddUPIIdComponent', () => {
  let component: AddUPIIdComponent;
  let fixture: ComponentFixture<AddUPIIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUPIIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUPIIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
