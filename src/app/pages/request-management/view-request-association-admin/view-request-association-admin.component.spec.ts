import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestAssociationAdminComponent } from './view-request-association-admin.component';

describe('ViewRequestAssociationAdminComponent', () => {
  let component: ViewRequestAssociationAdminComponent;
  let fixture: ComponentFixture<ViewRequestAssociationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestAssociationAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestAssociationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
