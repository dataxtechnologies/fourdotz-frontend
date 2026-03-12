import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestUsersComponent } from './view-request-users.component';

describe('ViewRequestUsersComponent', () => {
  let component: ViewRequestUsersComponent;
  let fixture: ComponentFixture<ViewRequestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
