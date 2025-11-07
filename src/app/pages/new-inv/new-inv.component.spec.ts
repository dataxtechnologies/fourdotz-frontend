import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvComponent } from './new-inv.component';

describe('NewInvComponent', () => {
  let component: NewInvComponent;
  let fixture: ComponentFixture<NewInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
