import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDashboardComponent } from './association-dashboard.component';

describe('AssociationDashboardComponent', () => {
  let component: AssociationDashboardComponent;
  let fixture: ComponentFixture<AssociationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
