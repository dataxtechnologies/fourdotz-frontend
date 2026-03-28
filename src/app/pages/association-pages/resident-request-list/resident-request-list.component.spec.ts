import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentRequestListComponent } from './resident-request-list.component';

describe('ResidentRequestListComponent', () => {
  let component: ResidentRequestListComponent;
  let fixture: ComponentFixture<ResidentRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
