import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommunityComponent } from './search-community.component';

describe('SearchCommunityComponent', () => {
  let component: SearchCommunityComponent;
  let fixture: ComponentFixture<SearchCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCommunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
