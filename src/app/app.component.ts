import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  lastRoute: string = '/';

  constructor(private router: Router) { }

  ngOnInit(): void {

    // ✅ Track last visited route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/no-network') {
          this.lastRoute = event.url;
          localStorage.setItem('lastRoute', this.lastRoute);
        }
      }
    });

    // ✅ Detect offline
    window.addEventListener('offline', () => {
      this.router.navigate(['/no-network']);
    });

    // ✅ Detect online
    window.addEventListener('online', () => {
      const last = localStorage.getItem('lastRoute') || '/';
      this.router.navigateByUrl(last);
    });

    // ✅ If app loads with no internet
    if (!navigator.onLine) {
      this.router.navigate(['/no-network']);
    }
  }
}