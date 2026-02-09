import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlotResourcesInassociationComponent } from './create-slot-resources-inassociation.component';

describe('CreateSlotResourcesInassociationComponent', () => {
  let component: CreateSlotResourcesInassociationComponent;
  let fixture: ComponentFixture<CreateSlotResourcesInassociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSlotResourcesInassociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSlotResourcesInassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
