import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAdminListComponent } from './service-admin-list.component';

describe('ServiceAdminListComponent', () => {
  let component: ServiceAdminListComponent;
  let fixture: ComponentFixture<ServiceAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
