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

  constructor(private apiService: ApiserviceService, private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserData(this.user_type)
  }

  getUserData(data : any) {
    this.apiService.UserInfo<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const userdata = res.data;
         if(this.user_type === 'hoa_admin'){
           if(userdata.document_uploaded === false){
            this.router.navigateByUrl('/onboarding/user-data')
          }else{
            this.router.navigateByUrl('/Association/Dashboard')
          }
         }
sessionStorage.setItem('userdata', JSON.stringify(userdata));
        } else {
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        // this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
