import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInv1Component } from './new-inv1.component';

describe('NewInv1Component', () => {
  let component: NewInv1Component;
  let fixture: ComponentFixture<NewInv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInv1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
