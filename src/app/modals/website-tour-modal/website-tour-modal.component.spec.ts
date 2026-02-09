import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTourModalComponent } from './website-tour-modal.component';

describe('WebsiteTourModalComponent', () => {
  let component: WebsiteTourModalComponent;
  let fixture: ComponentFixture<WebsiteTourModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteTourModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteTourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
