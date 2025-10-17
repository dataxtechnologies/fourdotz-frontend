import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddAssociationModalComponent } from '../../../modals/add-association-modal/add-association-modal.component';
import { Router, Routes } from '@angular/router';
import { TableService } from '../../../services/tableservice.service';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdmindataService } from '../../../services/adminservice/admindata.service';

@Component({
  selector: 'app-association-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-list.component.html',
  styleUrl: './association-list.component.css',
})
export class AssociationListComponent {
  filterForm!: FormGroup;
  Associationlist1;
  Associationlist2: any;
  pages: any;
  tableLoading: boolean = true;
  filteredProperties: any[] = [];

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AdminServices: AdmindataService,
    private fb: FormBuilder
  ) {
    this.Associationlist1 = new TableService();
    this.Associationlist1.initialize(this.Associationlist2, 8);
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''], // Invitational status filter
      residentSearch: [''], // Search by property name/email/phone
    });

    
    this.AdminServices.AssociationStatus$.subscribe((addassociation) => {
      if (addassociation) {
        this.getAssociationList();
      }
    });
    this.getAssociationList();

    // Apply filters whenever the form changes
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    if (!this.Associationlist2) return;

    const { status, residentSearch } = this.filterForm.value;

    this.filteredProperties = this.Associationlist2.filter((item: any) => {
      let matchesStatus = true;
      let matchesSearch = true;

      // Filter by status
      if (status) {
        matchesStatus =
          (item.invitation_status ? 'Accepted' : 'Pending/Declined') === status;
      }

      // Filter by search text
      if (residentSearch) {
        const searchLower = residentSearch.toLowerCase();
        matchesSearch =
          (item.property_name || '').toLowerCase().includes(searchLower) ||
          (item.email || '').toLowerCase().includes(searchLower) ||
          (item.mobile || '').toString().includes(searchLower);
      }

      return matchesStatus && matchesSearch;
    });

    // Update pagination if needed
    this.Associationlist1.initialize(this.filteredProperties, 8);
  }

  AddAssociation() {
    this.ModalService.open(AddAssociationModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  viewassociation(data: any) {
    this.route.navigateByUrl(`Superadmin/view-association/${data}`);
  }

  getAssociationList() {
    this.apiService.getAssociations<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationlist2 = res.data;
          this.Associationlist1.initialize(this.Associationlist2, 8);
          this.pages = Array.from(
            { length: this.Associationlist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.Associationlist2 = []
          this.Associationlist1.initialize(this.Associationlist2, 8);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.Associationlist2 = []
        this.Associationlist1.initialize(this.Associationlist2, 8);
        this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  resetFilters(): void {
    this.filterForm.reset({ status: '', residentSearch: '' });
    this.filteredProperties = [...this.Associationlist2];
    this.Associationlist1.initialize(this.filteredProperties, 8);
  }
}
