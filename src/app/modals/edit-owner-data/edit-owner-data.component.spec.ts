import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerDataComponent } from './edit-owner-data.component';

describe('EditOwnerDataComponent', () => {
  let component: EditOwnerDataComponent;
  let fixture: ComponentFixture<EditOwnerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOwnerDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOwnerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
