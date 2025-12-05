import { Component } from '@angular/core';

@Component({
  selector: 'app-visitors-entry-form-submitted',
  imports: [],
  templateUrl: './visitors-entry-form-submitted.component.html',
  styleUrl: './visitors-entry-form-submitted.component.css',
})
export class VisitorsEntryFormSubmittedComponent {
  goToFourdotz() {
    window.location.href = 'https://fourdotz.com';
  }
}
