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
    private apiService: ApiserviceService
  ) {
    this.propertieslist1 = new TableService()
    this.propertieslist1.initialize(this.propertieslist2, 10)
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      association: [''],
      residentType: [''],
      propertyNo: [''],
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    this.propertylist();
  }

  applyFilters() {
    const { association, residentType, propertyNo } = this.filterForm.value;

    this.filteredProperties = this.propertieslist2.filter((p: any) => {
      return (
        (!association || p._id === association) &&
        (!residentType || p.resident_type === residentType) &&
        (!propertyNo || p.property_no?.toLowerCase().includes(propertyNo.toLowerCase()))
      );
    });
  }

  resetFilters() {
    this.filterForm.reset();
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
            (_, i) => i + 1
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
}
