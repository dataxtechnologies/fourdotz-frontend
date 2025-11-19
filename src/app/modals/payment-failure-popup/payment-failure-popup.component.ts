import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
@Component({
  selector: 'app-payment-failure-popup',
  imports: [],
  templateUrl: './payment-failure-popup.component.html',
  styleUrl: './payment-failure-popup.component.css'
})
export class PaymentFailurePopupComponent {
 
  constructor(
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.playSuccessSound();
  }

  playSuccessSound() {
    const audio = new Audio('/assets/sounds/success.mp3');
    audio.play().catch(() => {
      console.log('Autoplay blocked — user interaction required');
    });
  }

  closemodal() {
    this.modal.close();
    this.router.navigateByUrl('/Owner/Maintenance-list');
  }
}
