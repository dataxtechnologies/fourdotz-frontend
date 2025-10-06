import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-superadmin-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrl: './superadmin-dashboard.component.css'
})
export class SuperadminDashboardComponent {

  Associationlist1
  Associationlist2: any
  pages: any
  tableLoading: boolean = true

  constructor(private router : Router, private apiService: ApiserviceService){
    this.Associationlist1 = new TableService()
    this.Associationlist1.initialize(this.Associationlist2, 5)
  }
  
  ngOnInit(): void {
      this.getAssociationList()
  
  }

  redirecttoAssociationlist(){
    this.router.navigateByUrl('Superadmin/Association-list')
  }


  getAssociationList() {
    this.apiService.getAssociations<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationlist2 = res.data;
          this.Associationlist1.initialize(this.Associationlist2, 5);
          this.pages = Array.from(
            { length: this.Associationlist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

}
