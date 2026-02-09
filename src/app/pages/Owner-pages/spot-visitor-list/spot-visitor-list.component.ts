import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { VisitorExitFormComponent } from '../../../modals/visitor-exit-form/visitor-exit-form.component';
import { ViewVisitorDetailsComponent } from '../../../modals/view-visitor-details/view-visitor-details.component';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-spot-visitor-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './spot-visitor-list.component.html',
  styleUrl: './spot-visitor-list.component.css'
})
export class SpotVisitorListComponent {

  user_id = localStorage.getItem('user_id');
  spotVisitorlist1: any;
  spotvisitorlist2: any;
  filteredVisitors: any[] = [];
  tableLoading: boolean = true;
  pages: any;
  associationId: any;

  filterForm!: FormGroup;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
    private fb: FormBuilder
  ) {
    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);

    this.filterForm = this.fb.group({
      visitor: [''],
      resident: [''],
      propertyNo: [''],
      gate: ['']
    });
  }

  ngOnInit(): void {

    const userdata = localStorage.getItem('userdata');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id;
    }

    this.ListVisitorinGateKeeper();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.AssociationService.GateKeeperStatus$.subscribe((gatekeeper) => {
      if (gatekeeper) {
        this.ListVisitorinGateKeeper();
      }
    });
  }

  ListVisitorinGateKeeper() {
    this.apiService.OwnerLoginPreVisitor<any>('gate_visitor_entry').subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.spotvisitorlist2 = res.data;

          this.filteredVisitors = [...this.spotvisitorlist2];
          this.spotVisitorlist1.initialize(this.filteredVisitors, 12);

          this.tableLoading = false;
        } else {
          this.spotvisitorlist2 = [];
          this.filteredVisitors = [];
          this.spotVisitorlist1.initialize([], 12);
          this.tableLoading = false;
        }
      },
      error: () => {
        this.spotvisitorlist2 = [];
        this.filteredVisitors = [];
        this.spotVisitorlist1.initialize([], 12);
        this.tableLoading = false;
      },
    });
  }

  applyFilters() {

    if (!this.spotvisitorlist2) return;

    const { visitor, resident, propertyNo, gate } = this.filterForm.value;

    this.filteredVisitors = this.spotvisitorlist2.filter((item: any) => {

      const visitorText = visitor?.toLowerCase() || '';
      const residentText = resident?.toLowerCase() || '';
      const propertyText = propertyNo?.toLowerCase() || '';
      const gateText = gate?.toLowerCase() || '';

      const matchVisitor =
        !visitorText ||
        item.visitor_name?.toLowerCase().includes(visitorText) ||
        String(item.visitor_mobile)?.includes(visitorText);

      const matchResident =
        !residentText ||
        item.resident_name?.toLowerCase().includes(residentText) ||
        String(item.resident_mobile)?.includes(residentText);

      const matchProperty =
        !propertyText ||
        item.property_no?.toLowerCase().includes(propertyText);

      const matchGate =
        !gateText ||
        item.gate?.toLowerCase().includes(gateText);

      return matchVisitor && matchResident && matchProperty && matchGate;
    });

    this.spotVisitorlist1.initialize(this.filteredVisitors, 12);
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredVisitors = [...this.spotvisitorlist2];
    this.spotVisitorlist1.initialize(this.filteredVisitors, 12);
  }

  AcceptVisitorInvite(data: any) {
    const payload = {
      visitor_no: data,
      approval_status: true,
    };

    this.apiService.VisitorAcceptoption<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.ListVisitorinGateKeeper();
        }
      },
    });
  }

    visitorView(data: any) {
    this.ModalService.open(ViewVisitorDetailsComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        visitor_details: data,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
}
