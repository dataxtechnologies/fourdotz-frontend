import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestsAdminComponent } from './list-requests-admin.component';

describe('ListRequestsAdminComponent', () => {
  let component: ListRequestsAdminComponent;
  let fixture: ComponentFixture<ListRequestsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
