import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerApprovalModalComponent } from '../../../modals/owner-approval-modal/owner-approval-modal.component';

@Component({
  selector: 'app-tenant-request-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-request-list.component.html',
  styleUrl: './tenant-request-list.component.css'
})
export class TenantRequestListComponent {
  Residentlist1: any;
  Residentlist2: any[] = [];
  filteredResidents: any[] = [];
  pages: any;
  tableLoading: boolean = true;
  user_id = localStorage.getItem('user_id');
  filterForm!: FormGroup;

  constructor(
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast: ToastrService,
    private fb: FormBuilder,
    private Modal: ModalService
  ) {
    this.Residentlist1 = new TableService();
    this.Residentlist1.initialize([], 11);

    this.filterForm = this.fb.group({
      search: [''],
      agreementType: [''],
      occupancyType: [''],
      approvalStatus: ['']
    });
  }

  ngOnInit(): void {
    this.getpropertiesdata(this.user_id);
    // this.openApprovalModal();

    this.AssociationService.PropertyStatus$.subscribe((res) => {
      if (res) this.getpropertiesdata(this.user_id);
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  openApprovalModal() {
    this.Modal.open(OwnerApprovalModalComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { user_id: this.user_id },
      actions: { click: false, escape: false },
    });
  }

  // ─── API ──────────────────────────────────────────────────────────────────
  getpropertiesdata(data: any) {
    this.tableLoading = true;
    this.apiService.listallresidentrequestlist<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success === true) {
          this.Residentlist2 = res.data;
          this.filteredResidents = [...this.Residentlist2];
          this.Residentlist1.initialize(this.filteredResidents, 11);
          this.pages = Array.from(
            { length: Math.ceil(this.Residentlist2.length / 11) },
            (_, i) => i + 1
          );
        } else {
          this.clearList();
        }
        this.tableLoading = false;
      },
      error: () => {
        this.clearList();
        this.tableLoading = false;
      }
    });
  }

  private clearList() {
    this.Residentlist2 = [];
    this.filteredResidents = [];
    this.Residentlist1.initialize([], 11);
    this.pages = [];
  }

  // ─── FILTERS ──────────────────────────────────────────────────────────────
  applyFilters() {
    const { search, agreementType, occupancyType, approvalStatus } = this.filterForm.value;
    const term = search?.toLowerCase().trim() || '';

    this.filteredResidents = this.Residentlist2.filter((item: any) => {
      // Search across: name, email, mobile, property_no
      const matchesSearch =
        !term ||
        item.property_no?.toLowerCase().includes(term) ||
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        String(item.mobile || '').includes(term);

      const matchesAgreement =
        !agreementType || item.agreement_type === agreementType;

      const matchesOccupancy =
        !occupancyType || item.occupancy_type === occupancyType;

      // approvalStatus is stored as boolean; compare against string 'true'/'false'
      const matchesStatus =
        approvalStatus === '' ||
        approvalStatus === null ||
        String(item.approval_status) === approvalStatus;

      return matchesSearch && matchesAgreement && matchesOccupancy && matchesStatus;
    });

    this.Residentlist1.initialize(this.filteredResidents, 11);
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      agreementType: '',
      occupancyType: '',
      approvalStatus: ''
    });
    this.filteredResidents = [...this.Residentlist2];
    this.Residentlist1.initialize(this.filteredResidents, 11);
  }

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  /** Converts snake_case API values to Title Case labels */
  formatLabel(value: string): string {
    if (!value) return '—';
    return value
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // ─── NAVIGATION ───────────────────────────────────────────────────────────
  viewresident(id: string) {
    this.route.navigateByUrl(`Association/view-resident-request/${id}`);
  }
}