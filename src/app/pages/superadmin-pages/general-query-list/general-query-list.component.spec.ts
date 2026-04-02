import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralQueryListComponent } from './general-query-list.component';

describe('GeneralQueryListComponent', () => {
  let component: GeneralQueryListComponent;
  let fixture: ComponentFixture<GeneralQueryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralQueryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralQueryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
