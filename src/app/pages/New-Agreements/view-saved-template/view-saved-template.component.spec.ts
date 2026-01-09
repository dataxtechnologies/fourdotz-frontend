import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedTemplateComponent } from './view-saved-template.component';

describe('ViewSavedTemplateComponent', () => {
  let component: ViewSavedTemplateComponent;
  let fixture: ComponentFixture<ViewSavedTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSavedTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSavedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
