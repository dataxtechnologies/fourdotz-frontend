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

@Component({
  selector: 'app-gate-keeper-pre-visitor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gate-keeper-pre-visitor.component.html',
  styleUrl: './gate-keeper-pre-visitor.component.css'
})
export class GateKeeperPreVisitorComponent {

  user_id = localStorage.getItem('user_id');
  spotVisitorlist1: any;
  spotvisitorlist2: any[] = [];

  filterForm!: FormGroup;

  tableLoading = true;
  pages: any;
  associationId: any;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private fb: FormBuilder
  ) {
    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize([], 12);
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      visitorSearch: [''],
      residentSearch: [''],
      propertySearch: [''],
      status: [''],
      fromDate: [''],
      toDate: ['']
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      this.associationId = JSON.parse(userdata)._id;
    }

    this.ListVisitorinGateKeeper('pre_visitor_entry');

    this.AssociationService.GateKeeperStatus$.subscribe((gatekeeper) => {
      if (gatekeeper) {
        this.ListVisitorinGateKeeper('pre_visitor_entry');
      }
    });
  }

  applyFilters() {

    const { visitorSearch, residentSearch, propertySearch, status, fromDate, toDate } = this.filterForm.value;

    let filtered = this.spotvisitorlist2.filter(item => {

      const matchVisitor =
        !visitorSearch ||
        item.visitor_name?.toLowerCase().includes(visitorSearch.toLowerCase()) ||
        String(item.visitor_mobile)?.includes(visitorSearch);

      const matchResident =
        !residentSearch ||
        item.resident_name?.toLowerCase().includes(residentSearch.toLowerCase()) ||
        String(item.resident_mobile)?.includes(residentSearch);

      const matchProperty =
        !propertySearch ||
        item.property_no?.toLowerCase().includes(propertySearch.toLowerCase());

      const matchStatus =
        !status || item.visitor_status === status;

      const createdDate = new Date(item.created_time.$date);

      const matchDate =
        (!fromDate || createdDate >= new Date(fromDate)) &&
        (!toDate || createdDate <= new Date(toDate));

      return matchVisitor && matchResident && matchProperty && matchStatus && matchDate;
    });

    this.spotVisitorlist1.initialize(filtered, 12);
  }

  resetFilters() {
    this.filterForm.reset();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
  }

  VisitorExit(data: any) {
    this.ModalService.open(VisitorExitFormComponent, {
      data: { visitorNo: data }
    });
  }

  visitorView(data: any) {
    this.ModalService.open(ViewVisitorDetailsComponent, {
      data: { visitor_details: data }
    });
  }

  ListVisitorinGateKeeper(type: any) {
    this.apiService.ListVisitorinGateKeeper<any>(type).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.spotvisitorlist2 = res.data;
          this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
          this.tableLoading = false;
        } else {
          this.spotvisitorlist2 = [];
          this.spotVisitorlist1.initialize([], 12);
          this.tableLoading = false;
        }
      },
      error: () => {
        this.spotvisitorlist2 = [];
        this.spotVisitorlist1.initialize([], 12);
        this.tableLoading = false;
      },
    });
  }
}
