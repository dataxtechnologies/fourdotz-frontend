import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-exited-screen',
  imports: [],
  templateUrl: './visitor-exited-screen.component.html',
  styleUrl: './visitor-exited-screen.component.css'
})
export class VisitorExitedScreenComponent {
  goToFourdotz() {
    window.location.href = 'https://fourdotz.com';
  }
}
