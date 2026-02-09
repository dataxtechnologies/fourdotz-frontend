import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdSpaceModalComponent } from './create-ad-space-modal.component';

describe('CreateAdSpaceModalComponent', () => {
  let component: CreateAdSpaceModalComponent;
  let fixture: ComponentFixture<CreateAdSpaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdSpaceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdSpaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
