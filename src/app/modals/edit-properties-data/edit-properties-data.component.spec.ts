import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertiesDataComponent } from './edit-properties-data.component';

describe('EditPropertiesDataComponent', () => {
  let component: EditPropertiesDataComponent;
  let fixture: ComponentFixture<EditPropertiesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPropertiesDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPropertiesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
