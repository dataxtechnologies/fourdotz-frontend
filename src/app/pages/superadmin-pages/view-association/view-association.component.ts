import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-view-association',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-association.component.html',
  styleUrl: './view-association.component.css',
})
export class ViewAssociationComponent {
  activeTab: string = 'Properties';
  Associationdata: any;
  AssociationId: any;
  header_loading: boolean = true;
  propertyTable: boolean = true;
  properties1;
  properties2: any;

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.properties1 = new TableService();
    this.properties1.initialize(this.properties2);
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.AssociationId = params['associationId'] || null;
    });

    this.getAssociationList(this.AssociationId);
    this.getpropertybyAssociation(this.AssociationId);
  }

  goback() {
    this.router.navigateByUrl('/Superadmin/Association-list')
  }

  getAssociationList(data: any) {
    this.apiService.getAssociationbyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationdata = res.data;
          this.header_loading = false; // stop loading
        } else {
          // alert(res.message || 'Something went wrong.');
          this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        this.header_loading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  getpropertybyAssociation(data: any) {
    this.propertyTable = true;

    this.apiService.getpropertybyAssociation<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success && res.data?.length > 0) {
          this.properties2 = res.data; // array of properties
          this.properties1 = new TableService();
          this.properties1.initialize(this.properties2);
        } else {
          console.log('Data not found');
          this.properties2 = [];
          this.properties1 = new TableService();
          this.properties1.initialize(this.properties2);
        }
        this.propertyTable = false; // stop loading in both cases
      },
      error: (err: any) => {
        console.log('Data not found', err.message);
        this.properties2 = [];
        this.properties1 = new TableService();
        this.properties1.initialize(this.properties2);
        this.propertyTable = false;
      },
    });
  }
}
