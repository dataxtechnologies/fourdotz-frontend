import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-join-fourdotz',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './join-fourdotz.component.html',
  styleUrl: './join-fourdotz.component.css'
})
export class JoinFourdotzComponent {
  communityName: string = '';
  associationLoading = false;
  associationList: any
  filteredAssociations: any
 userdata = localStorage.getItem('userdata');

FormatedUserData = this.userdata ? JSON.parse(this.userdata) : {};
  access_token = localStorage.getItem('access_token') || '';
  Showlogoutbtn = false;
  dropdownOpen: boolean = false;

  constructor(private apiService: ApiserviceService, private router: Router) { }

  ngOnInit(): void {

    this.fetchAssociations();

    if (this.access_token) {
      this.Showlogoutbtn = true;
    } else {
      this.Showlogoutbtn = false;
    }
  }

  fetchAssociations(): void {
    this.associationLoading = true;

    this.apiService.fetchAssociationlist<any>().subscribe({
      next: (res: any) => {
        this.associationLoading = false;

        if (res?.success && res?.data) {

          // ✅ Filter only document_uploaded = true
          this.associationList = res.data.filter(
            (item: any) => item.document_uploaded === true
          );

          this.filteredAssociations = [...this.associationList];

        } else {
          this.associationList = [];
          this.filteredAssociations = [];
        }
      },
      error: () => {
        this.associationLoading = false;
        this.associationList = [];
        this.filteredAssociations = [];
      },
    });
  }

onSearchChange() {
  const search = (this.communityName || '').toLowerCase();

  this.filteredAssociations = this.associationList.filter((item: any) =>
    item.property_name?.toLowerCase().includes(search)
  );

  this.dropdownOpen = true; // ✅ always open while typing
}


onInputFocus() {
  this.filteredAssociations = [...this.associationList]; // show all
  // this.dropdownOpen = true;
}


  selectAssociation(item: any) {
    this.router.navigate([
      '/onboarding/residents/get-started',
      item.user_id
    ]);
  }



  gotoRegister() {
    this.router.navigate(['/contact-us/enquiry-now']);
  }

  confirmlogout() {
    // this.showprocessingbtn = true
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.clearSessionAndRedirect(
            res.message || 'Logged out successfully'
          );
          // this.Toast.success(res.message);
          // this.showprocessingbtn = false
          // this.closeModal()
        } else {
          // this.Toast.error(res.message || 'Logout failed', 'Failed');
          // this.showprocessingbtn = false
          // this.closeModal()
        }
      },
      error: (err: any) => {
        //console.error('Logout failed:', err);
        // this.Toast.error(
        //   err?.error?.error?.message || 'Logout failed',
        //   'Failed'
        // );
        // this.showprocessingbtn = false
        // this.closeModal()
        this.clearSessionAndRedirect();
      },
    });
  }

  private clearSessionAndRedirect(message: string = 'Session expired') {
    localStorage.clear();
    sessionStorage.clear();
    // this.Toast.info(message, 'Info');
    this.router.navigateByUrl('join/join-fourdotz');
    window.location.reload();
  }

  siginbtn(){
    this.router.navigateByUrl('/auth/sign-in')
  }


  @HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (!target.closest('.searchable-dropdown')) {
    this.dropdownOpen = false;
  }
}
}
