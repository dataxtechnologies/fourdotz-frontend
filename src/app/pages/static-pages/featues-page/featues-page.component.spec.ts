import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatuesPageComponent } from './featues-page.component';

describe('FeatuesPageComponent', () => {
  let component: FeatuesPageComponent;
  let fixture: ComponentFixture<FeatuesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatuesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
