import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFourdotzComponent } from './join-fourdotz.component';

describe('JoinFourdotzComponent', () => {
  let component: JoinFourdotzComponent;
  let fixture: ComponentFixture<JoinFourdotzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinFourdotzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinFourdotzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
