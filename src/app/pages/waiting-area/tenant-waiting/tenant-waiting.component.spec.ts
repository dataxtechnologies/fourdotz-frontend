import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantWaitingComponent } from './tenant-waiting.component';

describe('TenantWaitingComponent', () => {
  let component: TenantWaitingComponent;
  let fixture: ComponentFixture<TenantWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantWaitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
