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
import { ViewResidentRequestDetailsComponent } from '../../../modals/view-resident-request-details/view-resident-request-details.component';
import { RequestPayoutAssociationComponent } from '../../../modals/request-payout-association/request-payout-association.component';
import { PayoutApproveSAComponent } from '../../../modals/payout-approve-sa/payout-approve-sa.component';
import { PayoutUpdateStatusSAComponent } from '../../../modals/payout-update-status-sa/payout-update-status-sa.component';
import { ViewPayoutDetailsComponent } from '../../../modals/view-payout-details/view-payout-details.component';

@Component({
  selector: 'app-payout-management',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './payout-management.component.html',
  styleUrl: './payout-management.component.css'
})
export class PayoutManagementComponent {

  steps = [
    {
      title: 'Payment collected',
      description: 'Users pay maintenance & fees. Funds land in Fourdotz PhonePe account.',
      badge: 'T Day',
      badgeColor: 'purple',
      iconColor: 'purple',
      iconPath: `<rect x="3" y="6" width="18" height="13" rx="2" stroke="#8C3D96" stroke-width="1.5"/>
                 <path d="M3 10h18" stroke="#8C3D96" stroke-width="1.5"/>
                 <circle cx="7" cy="14" r="1.2" fill="#8C3D96"/>`,
      detail: `UPI / online payment via <span class="highlight-purple">PhonePe</span>`
    },
    {
      title: 'Settlement to bank',
      description: 'PhonePe settles funds to Fourdotz bank account automatically.',
      badge: 'T+2 days',
      badgeColor: 'orange',
      iconColor: 'purple',
      iconPath: `<path d="M4 17l4-4 3 3 5-6 4 4" stroke="#8C3D96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#8C3D96" stroke-width="1.5"/>`,
      detail: `Max <span class="highlight-red">2 business days</span> from payment date`
    },
    {
      title: 'Holding period',
      description: 'Funds are held for verification. Association can view balance but not request payout yet.',
      badge: '3-day hold',
      badgeColor: 'orange',
      iconColor: 'orange',
      iconPath: `<circle cx="12" cy="12" r="9" stroke="#EB4431" stroke-width="1.5"/>
                 <path d="M12 7v5l3 3" stroke="#EB4431" stroke-width="1.5" stroke-linecap="round"/>`,
      detail: `Payout request unlocks <span class="highlight-purple">after day 3</span>`
    },
    {
      title: 'Payout request & approval',
      description: 'Association requests full or partial payout. Admin reviews and approves.',
      badge: '3–4 business days',
      badgeColor: 'purple',
      iconColor: 'purple',
      iconPath: `<rect x="3" y="8" width="18" height="12" rx="2" stroke="#8C3D96" stroke-width="1.5"/>
                 <path d="M7 8V6a5 5 0 0110 0v2" stroke="#8C3D96" stroke-width="1.5" stroke-linecap="round"/>
                 <path d="M8 14h3M13 14h3M8 17h2" stroke="#8C3D96" stroke-width="1.3" stroke-linecap="round"/>`,
      detail: `Status: <span class="highlight-purple">Approved → Completed</span> with UTR proof`
    }
  ];


  payoutdatas : any;
  cardLoading = false;

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
  status: ['']
});
  }

  ngOnInit(): void {
    this.listpayoutrequestinAssociation(this.user_id);
    this.payoutcardDetailsinAssociation();
    // this.openApprovalModal();

    this.AssociationService.PayoutRequestCreateStatus$.subscribe((res) => {
      if (res) this.listpayoutrequestinAssociation(this.user_id);
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  RequestPayoutOpenModal(data: any) {
    this.Modal.open(RequestPayoutAssociationComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { payoutdatas: data },
      actions: { click: false, escape: false },
    });
  }


  openviewrequestmodal(data: any) {
    this.Modal.open(PayoutApproveSAComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { request: data },

      actions: { click: false, escape: false },
    });
  }
  openupdatestatusmodal(data: any) {
    this.Modal.open(PayoutUpdateStatusSAComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { request: data },

      actions: { click: false, escape: false },
    });
  }

  openviewpayoutdetails(data: any) {
    this.Modal.open(ViewPayoutDetailsComponent, {
      modal: {
        enter: 'enter-coming-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: { request: data },

      actions: { click: false, escape: false },
    });
  }

  // ─── API ──────────────────────────────────────────────────────────────────
  listpayoutrequestinAssociation(data: any) {
    this.tableLoading = true;
    this.apiService.listpayoutrequestinAssociation<any>(data).subscribe({
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
  payoutcardDetailsinAssociation() {
    this.cardLoading = true;
    this.apiService.payoutcardDetailsinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success === true) {
          this.payoutdatas = res.data
        } else {
          this.payoutdatas = null;
        }
        this.cardLoading = false;
      },
      error: () => {
        this.payoutdatas = null;
        this.cardLoading = false;
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
  const { search, status } = this.filterForm.value;
  const term = search?.toLowerCase().trim() || '';

  this.filteredResidents = this.Residentlist2.filter((item: any) => {

    const matchesSearch =
      !term ||
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      String(item.mobile || '').includes(term) ||
      item.association_name?.toLowerCase().includes(term);

    const matchesStatus =
      !status || item.status === status;

    return matchesSearch && matchesStatus;
  });

  this.Residentlist1.initialize(this.filteredResidents, 11);
}

resetFilters() {
  this.filterForm.reset({
    search: '',
    status: ''
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