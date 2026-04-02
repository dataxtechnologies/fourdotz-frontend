import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { TableService } from '../../../services/tableservice.service';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PayoutApproveSAComponent } from '../../../modals/payout-approve-sa/payout-approve-sa.component';
import { PayoutUpdateStatusSAComponent } from '../../../modals/payout-update-status-sa/payout-update-status-sa.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ViewPayoutDetailsComponent } from '../../../modals/view-payout-details/view-payout-details.component';
import { ViewGeneralQueryDetailsComponent } from '../../../modals/view-general-query-details/view-general-query-details.component';
import { ViewTicketDetailsComponent } from '../../../modals/view-ticket-details/view-ticket-details.component';
import { UpdateTicketStatusComponent } from '../../../modals/update-ticket-status/update-ticket-status.component';

@Component({
  selector: 'app-support-ticket-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './support-ticket-list.component.html',
  styleUrl: './support-ticket-list.component.css'
})
export class SupportTicketListComponent {

  filterForm!: FormGroup;

  payoutTable = new TableService();
  payoutList: any[] = [];
  filteredList: any[] = [];

  pages: number[] = [];
  tableLoading: boolean = true;

  userId = localStorage.getItem('user_id');

  constructor(
    private route: Router,
    private apiService: ApiserviceService,
    private fb: FormBuilder,
    private Toast: ToastrService,
    private Modal: ModalService,
    private Association: AssociationServiceService
  ) {
    this.payoutTable.initialize([], 8);
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      status: ['']
    });

    this.listPayoutRequests();
    this.Association.PayoutRequestCreateStatus$.subscribe((addassociation) => {
      if (addassociation) {
        this.listPayoutRequests();
      }
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }



  openviewpayoutdetails(data: any) {
    this.Modal.open(ViewTicketDetailsComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { enquiry: data },

      actions: { click: false, escape: false },
    });
  }
  updateticketstatus(data: any) {
    this.Modal.open(UpdateTicketStatusComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { requestdata: data },

      actions: { click: false, escape: false },
    });
  }

  // ─── API ───────────────────────────────
  listPayoutRequests() {
    this.tableLoading = true;

    this.apiService.listAllRequestinSiteinSA<any>('support_request').subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.payoutList = res.data;
          this.filteredList = [...this.payoutList];

          this.payoutTable.initialize(this.filteredList, 8);
          this.setPagination();
        } else {
          this.resetTable();
        }
        this.tableLoading = false;
      },
      error: () => this.resetTable(),
    });
  }

  resetTable() {
    this.payoutList = [];
    this.filteredList = [];
    this.payoutTable.initialize([], 8);
    this.pages = [];
    this.tableLoading = false;
  }

  setPagination() {
    this.pages = Array.from(
      { length: this.payoutTable.totalPages },
      (_, i) => i + 1
    );
  }

  // ─── FILTER ────────────────────────────
  applyFilters() {
    const { search, status } = this.filterForm.value;
    const term = search?.toLowerCase().trim() || '';

    this.filteredList = this.payoutList.filter((item: any) => {

      const matchesSearch =
        !term ||
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.association_name?.toLowerCase().includes(term) ||
        String(item.mobile || '').includes(term);

      const matchesStatus =
        !status || item.enquiry_type === status;

      return matchesSearch && matchesStatus;
    });

    this.payoutTable.initialize(this.filteredList, 8);
    this.setPagination();
  }

  resetFilters() {
    this.filterForm.reset({ search: '', status: '' });
    this.filteredList = [...this.payoutList];
    this.payoutTable.initialize(this.filteredList, 8);
    this.setPagination();
  }

  // ─── HELPERS ───────────────────────────
  formatLabel(value: string): string {
    if (!value) return '—';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  truncate(text: string, limit: number = 20): string {
    if (!text) return '—';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}