import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorExitFormComponent } from './visitor-exit-form.component';

describe('VisitorExitFormComponent', () => {
  let component: VisitorExitFormComponent;
  let fixture: ComponentFixture<VisitorExitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorExitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorExitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
