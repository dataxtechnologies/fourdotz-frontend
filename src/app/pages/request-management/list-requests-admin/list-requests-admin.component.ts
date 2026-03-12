import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ViewRequestAdminComponent } from '../../../modals/view-request-admin/view-request-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-requests-admin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-requests-admin.component.html',
  styleUrl: './list-requests-admin.component.css'
})
export class ListRequestsAdminComponent implements OnInit {

  RequestList1 = new TableService();
  RequestList2: any[] = [];
  tableLoading = true;

  filterForm!: FormGroup;

  constructor(
    private api: ApiserviceService,
    private modal: ModalService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private AssociationService: AssociationServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      search: [''],
      workStatus: [''],
      residentType: [''],
      fromDate: [''],
      toDate: ['']
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    this.ListRequests();

    this.AssociationService.ChangeRequeststatusStatus$.subscribe((res: any) => {
      if (res?.success) this.ListRequests();
    });
  }

    viewrequestpage(reqId: any) {
    this.router.navigateByUrl(`Association/request-management/view/${reqId}`);
  }


  ListRequests() {
    this.tableLoading = true;

    this.api.ListAllrequestinServiceAdmin<any>().subscribe({
      next: (res) => {
        this.RequestList2 = res?.success ? res.data : [];
        this.RequestList1.initialize(this.RequestList2, 10);
        this.tableLoading = false;
      },
      error: () => {
        this.RequestList2 = [];
        this.RequestList1.initialize([], 10);
        this.tableLoading = false;
      },
    });
  }

  applyFilters() {

    const { search, workStatus, residentType, fromDate, toDate } = this.filterForm.value;

    let filtered = this.RequestList2.filter(req => {

      const matchSearch =
        !search ||
        req.property_no?.toLowerCase().includes(search.toLowerCase()) ||
        req.title?.toLowerCase().includes(search.toLowerCase()) ||
        req.resident_name?.toLowerCase().includes(search.toLowerCase()) ||
        String(req.resident_mobile)?.includes(search);

      const matchStatus =
        !workStatus || req.work_status === workStatus;

      const matchResidentType =
        !residentType || req.user_type === residentType;

      const createdDate = new Date(req.created_time.$date);

      const matchDate =
        (!fromDate || createdDate >= new Date(fromDate)) &&
        (!toDate || createdDate <= new Date(toDate));

      return matchSearch && matchStatus && matchResidentType && matchDate;
    });

    this.RequestList1.initialize(filtered, 10);
  }

  resetFilters() {
    this.filterForm.reset();
    this.RequestList1.initialize(this.RequestList2, 10);
  }

  OpenViewRequest(item: any) {
    this.modal.open(ViewRequestAdminComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: { RequestData: item },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
