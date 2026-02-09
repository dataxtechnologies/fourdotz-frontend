import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-owner-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-properties.component.html',
  styleUrls: ['./owner-properties.component.css'],
})
export class OwnerPropertiesComponent implements OnInit {
  filterForm!: FormGroup;

  propertieslist1;
  propertieslist2: any[] = [];
  filteredProperties: any[] = [];
  pages: number[] = [];
  tableLoading: boolean = true;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
  ) {
    this.propertieslist1 = new TableService();
    this.propertieslist1.initialize(this.propertieslist2, 10);
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      association: [''],
      residentType: [''],
      propertyNo: [''],
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    this.propertylist();

    // const menu = JSON.parse(sessionStorage.getItem('user_menu') || '{}');

    // if (!menu.ownerpropertytour) {
    //   this.startTour();
    // }
  }

  applyFilters() {
    const { association, residentType, propertyNo } = this.filterForm.value;

    this.filteredProperties = this.propertieslist2.filter((p: any) => {
      return (
        (!association || p._id === association) &&
        (!residentType || p.resident_type === residentType) &&
        (!propertyNo ||
          p.property_no?.toLowerCase().includes(propertyNo.toLowerCase()))
      );
    });
  }

  resetFilters() {
    this.filterForm.reset({
      association: '',
      residentType: '',
      propertyNo: '',
    });

    this.filteredProperties = [...this.propertieslist2];
  }

  addProperty() {
    this.modalService.open(AddPropertyComponent, {
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

  viewProperty(data: any) {
    this.router.navigateByUrl(`Owner/view-properties/${data}`);
  }

  propertylist() {
    this.apiService.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertieslist2 = res.data || [];
          this.filteredProperties = [...this.propertieslist2];

          // Initialize TableService
          this.propertieslist1 = new TableService();
          this.propertieslist1.initialize(this.propertieslist2, 10);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1,
          );

          this.tableLoading = false;
        } else {
          this.tableLoading = false;
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.tableLoading = false;
        //console.error('Property list fetch failed:', err);
      },
    });
  }

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
      // 1️⃣ Header
      {
        id: 'property-list',
        title: 'Property List',
        text: 'This list show the list of owner properties',
        attachTo: { element: '#tour-property-list', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      // 4️⃣ Owner Card
      {
        id: 'view-property',
        title: 'View Property Details',
        text: 'Click here to view owner property details.',
        attachTo: { element: '#tour-view-property', on: 'left' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.GotoTourNextpage(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  finishTourthispage() {
    // this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage(){
    // this.TourtoNextpage();
    this.shepherd.complete();
  }

  SkipTourthispage() {
    const payload = {
      menu: {
        ownerpropertytour: true,
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

  TourtoNextpage() {
    const payload = {
      menu: {
        ownerpropertytour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
          this.router.navigateByUrl('/Owner/tenants-list')
        }
      },
    });
  }
}
