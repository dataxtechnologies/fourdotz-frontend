import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAmenitiesByownerComponent } from './book-amenities-byowner.component';

describe('BookAmenitiesByownerComponent', () => {
  let component: BookAmenitiesByownerComponent;
  let fixture: ComponentFixture<BookAmenitiesByownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAmenitiesByownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAmenitiesByownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
