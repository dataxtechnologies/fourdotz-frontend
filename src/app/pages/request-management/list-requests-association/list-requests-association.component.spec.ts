import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestsAssociationComponent } from './list-requests-association.component';

describe('ListRequestsAssociationComponent', () => {
  let component: ListRequestsAssociationComponent;
  let fixture: ComponentFixture<ListRequestsAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestsAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestsAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
