import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentDocumentsComponent } from './resident-documents.component';

describe('ResidentDocumentsComponent', () => {
  let component: ResidentDocumentsComponent;
  let fixture: ComponentFixture<ResidentDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
