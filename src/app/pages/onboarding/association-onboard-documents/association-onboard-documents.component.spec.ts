import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationOnboardDocumentsComponent } from './association-onboard-documents.component';

describe('AssociationOnboardDocumentsComponent', () => {
  let component: AssociationOnboardDocumentsComponent;
  let fixture: ComponentFixture<AssociationOnboardDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationOnboardDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationOnboardDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
