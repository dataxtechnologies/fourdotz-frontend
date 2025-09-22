import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociationModalComponent } from './add-association-modal.component';

describe('AddAssociationModalComponent', () => {
  let component: AddAssociationModalComponent;
  let fixture: ComponentFixture<AddAssociationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssociationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssociationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
