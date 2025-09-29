import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewPropertyComponent } from './owner-view-property.component';

describe('OwnerViewPropertyComponent', () => {
  let component: OwnerViewPropertyComponent;
  let fixture: ComponentFixture<OwnerViewPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerViewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
