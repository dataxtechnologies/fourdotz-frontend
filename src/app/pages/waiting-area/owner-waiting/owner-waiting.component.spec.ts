import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerWaitingComponent } from './owner-waiting.component';

describe('OwnerWaitingComponent', () => {
  let component: OwnerWaitingComponent;
  let fixture: ComponentFixture<OwnerWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerWaitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
