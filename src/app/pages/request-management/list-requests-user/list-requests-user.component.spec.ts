import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestsUserComponent } from './list-requests-user.component';

describe('ListRequestsUserComponent', () => {
  let component: ListRequestsUserComponent;
  let fixture: ComponentFixture<ListRequestsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
