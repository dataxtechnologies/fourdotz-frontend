import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpersInactiveComponent } from './helpers-inactive.component';

describe('HelpersInactiveComponent', () => {
  let component: HelpersInactiveComponent;
  let fixture: ComponentFixture<HelpersInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpersInactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpersInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
