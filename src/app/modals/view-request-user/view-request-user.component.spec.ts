import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestUserComponent } from './view-request-user.component';

describe('ViewRequestUserComponent', () => {
  let component: ViewRequestUserComponent;
  let fixture: ComponentFixture<ViewRequestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
