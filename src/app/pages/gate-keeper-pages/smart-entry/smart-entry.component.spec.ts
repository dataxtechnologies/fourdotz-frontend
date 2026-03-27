import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartEntryComponent } from './smart-entry.component';

describe('SmartEntryComponent', () => {
  let component: SmartEntryComponent;
  let fixture: ComponentFixture<SmartEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
