import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVisitorListComponent } from './pre-visitor-list.component';

describe('PreVisitorListComponent', () => {
  let component: PreVisitorListComponent;
  let fixture: ComponentFixture<PreVisitorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreVisitorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreVisitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
