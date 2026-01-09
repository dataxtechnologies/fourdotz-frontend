import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllTemplatesComponent } from './list-all-templates.component';

describe('ListAllTemplatesComponent', () => {
  let component: ListAllTemplatesComponent;
  let fixture: ComponentFixture<ListAllTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
