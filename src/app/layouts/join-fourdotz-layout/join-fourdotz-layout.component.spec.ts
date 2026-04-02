import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFourdotzLayoutComponent } from './join-fourdotz-layout.component';

describe('JoinFourdotzLayoutComponent', () => {
  let component: JoinFourdotzLayoutComponent;
  let fixture: ComponentFixture<JoinFourdotzLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinFourdotzLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinFourdotzLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
