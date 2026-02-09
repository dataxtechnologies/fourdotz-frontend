import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotVisitorListComponent } from './spot-visitor-list.component';

describe('SpotVisitorListComponent', () => {
  let component: SpotVisitorListComponent;
  let fixture: ComponentFixture<SpotVisitorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotVisitorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotVisitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
