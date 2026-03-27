import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoInternetPageComponent } from './no-internet-page.component';

describe('NoInternetPageComponent', () => {
  let component: NoInternetPageComponent;
  let fixture: ComponentFixture<NoInternetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoInternetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoInternetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
