import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Announcementcomponent } from './announcements.component';

describe('Announcementcomponent', () => {
  let component: Announcementcomponent;
  let fixture: ComponentFixture<Announcementcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Announcementcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Announcementcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
