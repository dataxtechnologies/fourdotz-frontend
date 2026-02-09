import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationManageResourcesComponent } from './association-manage-resources.component';

describe('AssociationManageResourcesComponent', () => {
  let component: AssociationManageResourcesComponent;
  let fixture: ComponentFixture<AssociationManageResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationManageResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationManageResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
