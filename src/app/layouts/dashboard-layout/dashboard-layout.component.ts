import { Component } from '@angular/core';
import { SidebarItem, SIDEBAR_ITEMS } from '../../data/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  sidebarItems: SidebarItem[] = SIDEBAR_ITEMS;
  sidebarClosed = true; // Sidebar starts closed
  currentRoute = ''; // Track active route

  user_type = 'superadmin'; // Normally from AuthService

  constructor(private router: Router) {
    // Track the current route for active menu highlighting
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }
}
