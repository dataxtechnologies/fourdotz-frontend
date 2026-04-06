import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAssociationModalComponent } from './activate-association-modal.component';

describe('ActivateAssociationModalComponent', () => {
  let component: ActivateAssociationModalComponent;
  let fixture: ComponentFixture<ActivateAssociationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateAssociationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateAssociationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
