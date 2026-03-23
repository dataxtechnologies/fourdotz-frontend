import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddResidentComponent } from '../../../modals/add-resident/add-resident.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';
import { ShepherdService } from 'angular-shepherd';

@Component({
  selector: 'app-residents-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './residents-list.component.html',
  styleUrl: './residents-list.component.css',
})
export class ResidentsListComponent {

  associationId: any;
  Residentlist1: any;
  Residentlist2: any;
  filteredResidents: any[] = [];
  pages: any;
  tableLoading: boolean = true;
  unowned_properties: any;
  loadingIndexMap: { [key: number]: boolean } = {};

  // ✅ FILTER FORM
  filterForm!: FormGroup;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast: ToastrService,
    private DashboardService: DashboardLayoutService,
    private shepherd: ShepherdService,
    private fb: FormBuilder
  ) {
    this.Residentlist1 = new TableService();
    this.Residentlist1.initialize(this.Residentlist2, 11);

    // ✅ initialize filter form
    this.filterForm = this.fb.group({
      search: [''],
      propertyType: [''],
      residentType: ['']
    });
  }

  ngOnInit(): void {

    const userdata = localStorage.getItem('userdata');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id;
    }

    this.getpropertiesdata();

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.getpropertiesdata();
      }
    });

    // ✅ filter value changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

  }

  // ===============================================
  // SEND MAIL
  // ===============================================

  SendmailAgain(data: any, index: number) {
    this.loadingIndexMap[index] = true;

    const payload = {
      username: data,
    };

    this.apiService.SendmailAgain<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.getpropertiesdata();
          this.loadingIndexMap[index] = false;
        } else {
          this.Toast.error(res.message, 'Failed');
          this.loadingIndexMap[index] = false;
        }
      },
      error: (err: any) => {
        this.Toast.error(err.error.error.message, 'Failed');
        this.loadingIndexMap[index] = false;
      },
    });
  }

  // ===============================================
  // ADD RESIDENT
  // ===============================================

  AddResident(data: any) {
    this.ModalService.open(AddResidentComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId1: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  // ===============================================
  // VIEW RESIDENT
  // ===============================================

  viewresident(data: any) {
    this.route.navigateByUrl(`Association/view-resident/${data}`);
  }

  // ===============================================
  // GET DATA API
  // ===============================================

  getpropertiesdata() {
    this.apiService.ResidentedProperty<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {

          this.Residentlist2 = res.data;

          // unowned properties
          this.unowned_properties = this.Residentlist2.filter(
            (item: any) => !item.resident_type,
          );

          // initialize filtered data
          this.filteredResidents = [...this.Residentlist2];
          this.Residentlist1.initialize(this.filteredResidents, 11);

          this.pages = Array.from(
            { length: Math.ceil(this.Residentlist2.length / 11) },
            (_, i) => i + 1,
          );

          this.tableLoading = false;
        } else {
          this.Residentlist2 = [];
          this.filteredResidents = [];
          this.unowned_properties = [];
          this.Residentlist1.initialize(this.filteredResidents, 11);
          this.pages = [];
          this.tableLoading = false;
        }
      },
      error: () => {
        this.Residentlist2 = [];
        this.filteredResidents = [];
        this.unowned_properties = [];
        this.Residentlist1.initialize(this.filteredResidents, 11);
        this.pages = [];
        this.tableLoading = false;
      },
    });
  }

  // ===============================================
  // APPLY FILTER
  // ===============================================

  applyFilters() {
    if (!this.Residentlist2) return;

    const { search, propertyType, residentType } = this.filterForm.value;

    this.filteredResidents = this.Residentlist2.filter((item: any) => {

      const searchText = search?.toLowerCase() || '';

      const residentName =
        item.resident_type === 'tenant'
          ? item.tenant_name
          : item.owner_name;

      const email =
        item.resident_type === 'tenant'
          ? item.tenant_email
          : item.owner_email;

      const matchesSearch =
        !searchText ||
        residentName?.toLowerCase().includes(searchText) ||
        email?.toLowerCase().includes(searchText) ||
        item.property_no?.toLowerCase().includes(searchText);

      const matchesPropertyType =
        !propertyType || item.property_type === propertyType;

      const matchesResidentType =
        !residentType || item.resident_type === residentType;

      return matchesSearch && matchesPropertyType && matchesResidentType;
    });

    this.Residentlist1.initialize(this.filteredResidents, 11);
  }

  // ===============================================
  // RESET FILTER
  // ===============================================

  resetFilters() {
   this.filterForm.reset({
    search: '',
    propertyType: '',
    residentType: ''
  });

  this.applyFilters();
    this.filteredResidents = [...this.Residentlist2];
    this.Residentlist1.initialize(this.filteredResidents, 11);
  }

  // ===============================================
  // SHEPHERD TOUR
  // ===============================================

  startTour() {
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
        id: 'resident-list',
        title: 'Resident List',
        text: 'This list show the list of residented properties with resident details.',
        attachTo: { element: '#tour-resident-list', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTour(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'add-resident',
        title: 'Add Resident',
        text: 'Click here to add the new resident to the unoccupied properties.',
        attachTo: { element: '#tour-add-resident', on: 'left' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'view-resident',
        title: 'View Resident',
        text: 'Click here to view the resident details.',
        attachTo: { element: '#tour-view-resident', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  finishTour() {
    this.shepherd.complete();
  }

  onPropertyTourCompleted() {
    const payload = {
      menu: {
        residentlisttour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }
}
