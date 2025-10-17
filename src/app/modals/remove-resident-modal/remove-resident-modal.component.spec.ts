import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveResidentModalComponent } from './remove-resident-modal.component';

describe('RemoveResidentModalComponent', () => {
  let component: RemoveResidentModalComponent;
  let fixture: ComponentFixture<RemoveResidentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveResidentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveResidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
