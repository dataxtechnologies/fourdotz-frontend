import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResourcesAssociationComponent } from './view-resources-association.component';

describe('ViewResourcesAssociationComponent', () => {
  let component: ViewResourcesAssociationComponent;
  let fixture: ComponentFixture<ViewResourcesAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResourcesAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResourcesAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
