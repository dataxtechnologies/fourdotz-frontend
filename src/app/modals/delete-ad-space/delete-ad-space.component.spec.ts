import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdSpaceComponent } from './delete-ad-space.component';

describe('DeleteAdSpaceComponent', () => {
  let component: DeleteAdSpaceComponent;
  let fixture: ComponentFixture<DeleteAdSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAdSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAdSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
