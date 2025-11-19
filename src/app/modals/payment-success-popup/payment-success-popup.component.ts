import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-payment-success-popup',
  templateUrl: './payment-success-popup.component.html',
  styleUrls: ['./payment-success-popup.component.css'], // <-- FIXED (styleUrls)
})
export class PaymentSuccessPopupComponent implements OnInit {
  
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
