import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSpaceListComponent } from './ad-space-list.component';

describe('AdSpaceListComponent', () => {
  let component: AdSpaceListComponent;
  let fixture: ComponentFixture<AdSpaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSpaceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSpaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
