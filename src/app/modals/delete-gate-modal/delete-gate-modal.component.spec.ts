import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGateModalComponent } from './delete-gate-modal.component';

describe('DeleteGateModalComponent', () => {
  let component: DeleteGateModalComponent;
  let fixture: ComponentFixture<DeleteGateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
