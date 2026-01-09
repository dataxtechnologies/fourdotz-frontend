import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateAssociationComponent } from './create-template-association.component';

describe('CreateTemplateAssociationComponent', () => {
  let component: CreateTemplateAssociationComponent;
  let fixture: ComponentFixture<CreateTemplateAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTemplateAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTemplateAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
