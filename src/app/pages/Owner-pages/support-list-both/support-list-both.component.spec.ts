import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportListBothComponent } from './support-list-both.component';

describe('SupportListBothComponent', () => {
  let component: SupportListBothComponent;
  let fixture: ComponentFixture<SupportListBothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportListBothComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportListBothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
