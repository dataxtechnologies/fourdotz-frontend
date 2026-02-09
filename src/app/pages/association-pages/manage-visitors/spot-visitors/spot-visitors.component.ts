import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../../services/api/apiservice.service';
import { TableService } from '../../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AssociationServiceService } from '../../../../services/association/association-service.service';
import { ViewVisitorDetailsComponent } from '../../../../modals/view-visitor-details/view-visitor-details.component';

@Component({
  selector: 'app-spot-visitors',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './spot-visitors.component.html',
  styleUrl: './spot-visitors.component.css'
})
export class SpotVisitorsComponent {

  user_id = localStorage.getItem('user_id');
  spotVisitorlist1: any;
  spotvisitorlist2: any;
  filteredVisitors: any[] = [];
  tableLoading: boolean = true;
  pages: any;
  associationId: any;
  user_type: any;

  // FILTER FORM
  filterForm!: FormGroup;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private fb: FormBuilder
  ) {

    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);

    // initialize filters
    this.filterForm = this.fb.group({
      visitor: [''],
      resident: [''],
      propertyNo: [''],
      gate: ['']
    });
  }

  ngOnInit(): void {

    const userdata = localStorage.getItem('userdata');
    this.user_type = localStorage.getItem('user_type');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id;
    }

    this.ListVisitorinGateKeeper('gate_visitor_entry');

    // filter change
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.ListVisitorinGateKeeper('gate_visitor_entry');
      }
    });
  }

  Addproperty() {
    this.ModalService.open(AddPropertyComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  visitorView(data: any) {
    this.ModalService.open(ViewVisitorDetailsComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: { visitor_details: data },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  viewproperty(data: any) {
    this.route.navigateByUrl(`Association/view-properties/${data}`);
  }

  /* ================= FETCH VISITORS ================= */

  ListVisitorinGateKeeper(data: any) {
    this.apiService.ListVisitorinGateKeeper<any>(data).subscribe({
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

  /* ================= APPLY FILTER ================= */

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

  /* ================= RESET FILTER ================= */

  resetFilters() {
    this.filterForm.reset();
    this.filteredVisitors = [...this.spotvisitorlist2];
    this.spotVisitorlist1.initialize(this.filteredVisitors, 12);
  }
}