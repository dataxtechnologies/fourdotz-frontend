import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQrAssociationComponent } from './generate-qr-association.component';

describe('GenerateQrAssociationComponent', () => {
  let component: GenerateQrAssociationComponent;
  let fixture: ComponentFixture<GenerateQrAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQrAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQrAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
