import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-internet-page',
  imports: [],
  templateUrl: './no-internet-page.component.html',
  styleUrl: './no-internet-page.component.css'
})
export class NoInternetPageComponent implements OnInit {

  constructor(private router: Router) { }

  private onlineHandler = () => {
    console.log('Internet back');
    this.router.navigateByUrl('/auth/sign-in');
  };

  ngOnInit(): void {

    // Check immediately
    if (navigator.onLine) {
      this.router.navigateByUrl('/auth/sign-in');
    }

    window.addEventListener('online', this.onlineHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineHandler);
  }

  reload() {
    if (navigator.onLine) {
      this.router.navigateByUrl('/auth/sign-in');
    } else {
      window.location.reload();
    }
  }

}
