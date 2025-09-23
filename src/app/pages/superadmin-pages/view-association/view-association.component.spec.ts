import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssociationComponent } from './view-association.component';

describe('ViewAssociationComponent', () => {
  let component: ViewAssociationComponent;
  let fixture: ComponentFixture<ViewAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
