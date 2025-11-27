import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestAdminComponent } from './view-request-admin.component';

describe('ViewRequestAdminComponent', () => {
  let component: ViewRequestAdminComponent;
  let fixture: ComponentFixture<ViewRequestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
