import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsListAssociationComponent } from './visitors-list-association.component';

describe('VisitorsListAssociationComponent', () => {
  let component: VisitorsListAssociationComponent;
  let fixture: ComponentFixture<VisitorsListAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsListAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsListAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
