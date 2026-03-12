import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddAssociationModalComponent } from '../../../modals/add-association-modal/add-association-modal.component';
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
import { AdmindataService } from '../../../services/adminservice/admindata.service';
import { ToastrService } from 'ngx-toastr';
import { CreateAdSpaceModalComponent } from '../../../modals/create-ad-space-modal/create-ad-space-modal.component';
import { DeleteAdSpaceComponent } from '../../../modals/delete-ad-space/delete-ad-space.component';

@Component({
  selector: 'app-ad-space-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ad-space-list.component.html',
  styleUrl: './ad-space-list.component.css'
})
export class AdSpaceListComponent {

  filterForm!: FormGroup;

  AdListTable: any;
  adListData: any[] = [];
  pages: any;

  tableLoading: boolean = true;
  filteredAds: any[] = [];

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AdminServices: AdmindataService,
    private fb: FormBuilder,
    private Toast: ToastrService,
    private AdminService : AdmindataService
  ) {
    this.AdListTable = new TableService();
    this.AdListTable.initialize(this.adListData, 8);
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      status: [''],
      search: [''],
    });

    this.getAdSpaceList();

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    this.AdminService.AdminAdServiceStatus$.subscribe((adcreated) => {
      if (adcreated) {
        this.getAdSpaceList();
      }
    });


    this.AdminService.AdminAdSapaceDeleteStatus$.subscribe((addelete) => {
      if (addelete) {
        this.getAdSpaceList();
      }
    });
  }

  // ---------------------------------------------
  // 🔎 FILTER
  // ---------------------------------------------
  applyFilters(): void {

    if (!this.adListData) return;

    const { status, search } = this.filterForm.value;

    this.filteredAds = this.adListData.filter((item: any) => {

      let matchesStatus = true;
      let matchesSearch = true;

      if (status !== '') {
        matchesStatus = item.active === (status === 'Active');
      }

      if (search) {
        const text = search.toLowerCase();

        matchesSearch =
          (item.title || '').toLowerCase().includes(text) ||
          (item.description || '').toLowerCase().includes(text) ||
          (item.advertisement_display_area || '').toLowerCase().includes(text);
      }

      return matchesStatus && matchesSearch;
    });

    this.AdListTable.initialize(this.filteredAds, 8);

    this.pages = Array.from(
      { length: this.AdListTable.totalPages },
      (_, i) => i + 1
    );
  }

  resetFilters(): void {
    this.filterForm.reset({ status: '', search: '' });
    this.filteredAds = [...this.adListData];
    this.AdListTable.initialize(this.filteredAds, 8);
  }

  // ---------------------------------------------
  // 📦 FETCH ADS
  // ---------------------------------------------
  getAdSpaceList() {
    this.tableLoading = true;

    this.apiService.getalladspace<any>().subscribe({
      next: (res: any) => {

        if (res?.success) {

          this.adListData = res.data;

          this.AdListTable.initialize(this.adListData, 8);

          this.pages = Array.from(
            { length: this.AdListTable.totalPages },
            (_, i) => i + 1
          );

          this.tableLoading = false;

        } else {
          this.resetTable();
        }
      },
      error: () => this.resetTable(),
    });
  }

  resetTable() {
    this.adListData = [];
    this.AdListTable.initialize([], 8);
    this.pages = [];
    this.tableLoading = false;
  }

  // ---------------------------------------------
  // ➕ POST AD
  // ---------------------------------------------
  PostAd() {
    this.ModalService.open(CreateAdSpaceModalComponent, {
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


  DeleteAdSpaceConfirmModal(id : any) {
    this.ModalService.open(DeleteAdSpaceComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        ad_id: id
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  // ---------------------------------------------
  // 👁 VIEW AD
  // ---------------------------------------------
  viewAd(adId: any) {
    this.route.navigateByUrl(`Superadmin/view-ad/${adId}`);
  }

  // ---------------------------------------------
  // 📧 RESEND / ACTION
  // ---------------------------------------------
  toggleAdStatus(ad: any) {

    const payload = {
      ad_id: ad._id,
      active: !ad.active
    };

    // this.apiService.updateAdStatus<any>(payload).subscribe({
    //   next: (res: any) => {
    //     if (res?.success) {
    //       this.getAdSpaceList();
    //     } else {
    //       this.Toast.error(res.message, 'Failed');
    //     }
    //   },
    //   error: () => {
    //     this.Toast.error('Failed to update status', 'Error');
    //   },
    // });
  }
}
