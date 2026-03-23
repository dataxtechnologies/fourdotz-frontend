import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent {
  user_id = localStorage.getItem('user_id');

  propertylist1;
  propertylist2: any[] = [];      // ORIGINAL API DATA
  filteredPropertyList: any[] = []; // FILTERED DATA

  tableLoading = true;
  pages: any;
  associationId: any;
  filterForm!: FormGroup;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private fb: FormBuilder,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      propertyType: [''],
    });

    this.propertylist1 = new TableService();
    this.propertylist1.initialize([], 12);
  }

  ngOnInit(): void {
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      this.associationId = JSON.parse(userdata)._id;
    }

    this.getpropertiesdata();

    // 🔥 FILTER CHANGE LISTENER
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.getpropertiesdata();
      }
    });
  }

  /* RESET FILTER */
resetFilters() {
  this.filterForm.reset({
    search: '',
    propertyType: ''
  });

  this.applyFilters();
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

  viewproperty(id: any) {
    this.route.navigateByUrl(`Association/view-properties/${id}`);
  }

  /* FETCH PROPERTY DATA */
  getpropertiesdata() {
    this.apiService.PropertyListinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertylist2 = res.data;
          this.filteredPropertyList = [...this.propertylist2];
          this.propertylist1.initialize(this.filteredPropertyList, 12);
        } else {
          this.propertylist2 = [];
          this.filteredPropertyList = [];
          this.propertylist1.initialize([], 12);
        }
        this.tableLoading = false;
      },
      error: () => {
        this.propertylist2 = [];
        this.filteredPropertyList = [];
        this.propertylist1.initialize([], 12);
        this.tableLoading = false;
      },
    });
  }

  /* 🔥 MAIN FILTER FUNCTION */
  applyFilters() {
    const search = this.filterForm.get('search')?.value?.toLowerCase() || '';
    const propertyType = this.filterForm.get('propertyType')?.value || '';

    this.filteredPropertyList = this.propertylist2.filter((item: any) => {
      const matchesSearch =
        !search ||
        item.property_no?.toLowerCase().includes(search) ||
        item.property_type?.toLowerCase().includes(search);

      const matchesType =
        !propertyType ||
        item.property_type?.toLowerCase() === propertyType.toLowerCase();

      return matchesSearch && matchesType;
    });

    this.propertylist1.initialize(this.filteredPropertyList, 12);
  }

  // ================= SHEPHERD TOUR =================
  startPropertyTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      {
        id: 'header',
        title: 'Properties',
        text: 'This is the Properties List page where you manage all properties.',
        attachTo: { element: '#tour-header', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-skip',
            action: () => {
              this.onPropertyTourCompleted();
              this.shepherd.complete();
            },
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'add',
        title: 'Add Property',
        text: 'Click here to add a new property.',
        attachTo: { element: '#tour-add-property', on: 'bottom' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },
      {
        id: 'filters',
        title: 'Filters',
        text: 'Use filters to quickly find properties.',
        attachTo: { element: '#tour-filters', on: 'bottom' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },
      {
        id: 'View Property',
        title: 'View Property',
        text: 'Click on the property to view the details.',
        attachTo: { element: '#tour-view-property', on: 'left' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },
      {
        id: 'table',
        title: 'Property Table',
        text: 'This table lists all properties with details.',
        attachTo: { element: '#tour-table', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Finish', classes: 'shepherd-btn-primary', action: () => this.shepherd.complete() },
        ],
      },
    ]);

    this.shepherd.start();
  }

  onPropertyTourCompleted() {
    const payload = {
      menu: {
        propertylist: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }
}
