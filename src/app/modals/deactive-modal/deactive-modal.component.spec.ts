import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveModalComponent } from './deactive-modal.component';

describe('DeactiveModalComponent', () => {
  let component: DeactiveModalComponent;
  let fixture: ComponentFixture<DeactiveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactiveModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
