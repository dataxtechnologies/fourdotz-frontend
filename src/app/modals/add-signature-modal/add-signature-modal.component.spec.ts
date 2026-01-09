import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignatureModalComponent } from './add-signature-modal.component';

describe('AddSignatureModalComponent', () => {
  let component: AddSignatureModalComponent;
  let fixture: ComponentFixture<AddSignatureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSignatureModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSignatureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
