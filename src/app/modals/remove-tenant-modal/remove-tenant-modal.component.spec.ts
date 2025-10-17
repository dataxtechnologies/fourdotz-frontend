import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTenantModalComponent } from './remove-tenant-modal.component';

describe('RemoveTenantModalComponent', () => {
  let component: RemoveTenantModalComponent;
  let fixture: ComponentFixture<RemoveTenantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTenantModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveTenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
