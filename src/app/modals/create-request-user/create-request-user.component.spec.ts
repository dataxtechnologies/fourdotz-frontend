import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestUserComponent } from './create-request-user.component';

describe('CreateRequestUserComponent', () => {
  let component: CreateRequestUserComponent;
  let fixture: ComponentFixture<CreateRequestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
