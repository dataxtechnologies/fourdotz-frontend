import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetDataComponent } from './edit-pet-data.component';

describe('EditPetDataComponent', () => {
  let component: EditPetDataComponent;
  let fixture: ComponentFixture<EditPetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPetDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
