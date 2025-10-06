import { Component } from '@angular/core';
import { SidebarItem, SIDEBAR_ITEMS } from '../../data/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiserviceService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-onboarding-layout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterOutlet],
  templateUrl: './onboarding-layout.component.html',
  styleUrl: './onboarding-layout.component.css',
})
export class OnboardingLayoutComponent {
  user_type = sessionStorage.getItem('user_type'); // Owner , superadmin , association , Tenant
}
