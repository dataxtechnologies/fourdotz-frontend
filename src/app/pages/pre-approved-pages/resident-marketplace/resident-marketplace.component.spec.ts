import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentMarketplaceComponent } from './resident-marketplace.component';

describe('ResidentMarketplaceComponent', () => {
  let component: ResidentMarketplaceComponent;
  let fixture: ComponentFixture<ResidentMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentMarketplaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
