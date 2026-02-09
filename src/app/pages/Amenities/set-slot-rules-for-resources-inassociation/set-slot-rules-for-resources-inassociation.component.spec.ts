import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSlotRulesForResourcesInassociationComponent } from './set-slot-rules-for-resources-inassociation.component';

describe('SetSlotRulesForResourcesInassociationComponent', () => {
  let component: SetSlotRulesForResourcesInassociationComponent;
  let fixture: ComponentFixture<SetSlotRulesForResourcesInassociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetSlotRulesForResourcesInassociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetSlotRulesForResourcesInassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
