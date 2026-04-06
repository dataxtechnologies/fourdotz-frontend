import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';

@Component({
  selector: 'app-helpers-inactive',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './helpers-inactive.component.html',
  styleUrl: './helpers-inactive.component.css'
})
export class HelpersInactiveComponent {

    user_type = localStorage.getItem('user_type');
    originaluserdata: any


    constructor(private router: Router, private apiService: ApiserviceService) { }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      console.log('user_type', this.user_type);
      this.getUserData(this.user_type);
    }


    getUserData(role: any): void {
    // this.isRefreshing = true; // ✅ START LOADER

    this.apiService.UserInfo<any>(role).subscribe({
      next: (res) => {
        // this.isRefreshing = false; // ✅ STOP LOADER

        if (res?.success) {

          this.originaluserdata = res.data;
          console.log('userdata', this.originaluserdata);
          
          const usertype = this.originaluserdata.user_type;

          // ✅ NEW PRIORITY CHECK (FIRST)
          if( this.originaluserdata.association_status === true)  {
            console.log(this.originaluserdata.property_merge_status, 'userdata.property_merge_status');
            console.log(usertype, 'usertype');
            
            if(this.user_type === 'gate_keeper'){
              this.router.navigateByUrl('/Gate-keeper/visitors-management/visitors-list');
            }
           else if(this.user_type === 'service_admin'){
              this.router.navigateByUrl('/Service-admin/manage-requests');
            }
            // this.router.navigateByUrl('/Owner/Dashboard');
           
          }

          // // ✅ EXISTING FLOW (UNCHANGED)
          // if (
          //   (role === 'owner' || role === 'tenant') &&
          //   userdata.upi_submit_status === false
          // ) {
          //   // this.openUPIModal();
          // }
        }
      },
      error: () => {
        // this.isRefreshing = false; // safety
      },
    });
  }




  gotosupport() {
  window.open('/contact-us/enquiry-now', '_blank');
}
}
