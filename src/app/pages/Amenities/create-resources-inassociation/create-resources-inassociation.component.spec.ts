import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourcesInassociationComponent } from './create-resources-inassociation.component';

describe('CreateResourcesInassociationComponent', () => {
  let component: CreateResourcesInassociationComponent;
  let fixture: ComponentFixture<CreateResourcesInassociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResourcesInassociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResourcesInassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
