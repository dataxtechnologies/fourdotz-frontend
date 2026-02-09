import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAmenitiesBytenantComponent } from './book-amenities-bytenant.component';

describe('BookAmenitiesBytenantComponent', () => {
  let component: BookAmenitiesBytenantComponent;
  let fixture: ComponentFixture<BookAmenitiesBytenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAmenitiesBytenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAmenitiesBytenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
