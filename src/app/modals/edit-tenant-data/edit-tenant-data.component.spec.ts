import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantDataComponent } from './edit-tenant-data.component';

describe('EditTenantDataComponent', () => {
  let component: EditTenantDataComponent;
  let fixture: ComponentFixture<EditTenantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTenantDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTenantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
