import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
 
export interface Property {
  _id: any;
  property_name: any;
  property_no: string;
  hoa_admin_id: string;
  association_name: string; // ✅ ADD THIS
}
@Component({
  selector: 'app-create-support-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-support-ticket.component.html',
  styleUrl: './create-support-ticket.component.css'
})
export class CreateSupportTicketComponent {

  // ─── Module map derived from sidebar config ───────────────────────────────
  private moduleMap: Record<string, string[]> = {
    association: [
      'Dashboard',
      'Properties',
      'Residents',
      'Maintenance',
      'Announcement',
      'Payouts Management',
      'Agreement Management',
      'Helper Management',
      'Amenities Management',
      'Resident Complaints',
      'Resident Requests',
      'Visitor Management',
      'Contact Support',
    ],
    owner: [
      'Dashboard',
      'Property',
      'Tenants',
      'Maintenance',
      'Rental Invoice',
      'Announcement',
      'Book Amenities',
      'Manage Agreement',
      'Manage Request',
      'Payouts Management',
      'Manage Visitors',
      'Contact Support',
    ],
    tenant: [
      'Dashboard',
      'Rented Property',
      'Maintenance',
      'Rental Invoice',
      'Announcement',
      'Book Amenities',
      'Sign Agreements',
      'Manage Request',
      'Manage Visitors',
      'Contact Support',
    ],
  };
 
  // ─── Sample properties — replace with API call as needed ─────────────────
allProperties:any = [];
 
  // ─── State ────────────────────────────────────────────────────────────────
  userType        = '';
  modules: string[] = [];
 
  // Property search
  propertySearch       = '';
  selectedProperty: Property | null = null;
  filteredProperties: Property[] = [];
  showPropertyDropdown = false;
 
  // Form fields
  selectedModule  = '';
  description     = '';
 
  // Validation flags
  submitted = false;
  btnstatusloading = false;

  fulluserData = localStorage.getItem('userdata') || '{}';

  formatedfulluserData = JSON.parse(this.fulluserData);
 
  constructor(private el: ElementRef, private apiService: ApiserviceService, private location : Location, private Toast : ToastrService) {}
 
ngOnInit(): void {
  const raw = (localStorage.getItem('user_type') || 'tenant').trim().toLowerCase();
  this.userType = raw;
  this.modules = this.moduleMap[raw] ?? this.moduleMap['tenant'];

  if (this.userType === 'owner') {
    this.getOwnerProperties();
  } else if (this.userType === 'tenant') {
    this.getTenantProperties();
  }

  console.log('formatedfulluserData', this.formatedfulluserData);
}

  goback(){
    this.location.back();
  }





propertylist() {
  this.apiService.ownerproperties<any>().subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.allProperties = (res.data || []).map((p: any) => ({
          _id: p._id,
          property_name: p.property_name,
          property_no: p.property_no || '',
          hoa_admin_id: p.hoa_admin_id || '',
          association_name: p.association_name || '' // ✅ ADD THIS
        }));
      }
    },
    error: () => {}
  });
}


getOwnerProperties() {
  this.apiService.ownerproperties<any>().subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.mapProperties(res.data);
      }
    },
    error: () => {}
  });
}

getTenantProperties() {
  this.apiService.TenantPropertyDatas<any>().subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.mapProperties(res.data);
      }
    },
    error: () => {}
  });
}

mapProperties(data: any[]) {
  this.allProperties = (data || []).map((p: any) => ({
    _id: p._id,
    property_name: p.property_name,
    property_no: p.property_no || '',
    hoa_admin_id: p.hoa_admin_id || '',
    association_name: p.association_name || ''
  }));
}


 
  // ─── Close dropdown when clicking outside ────────────────────────────────
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const clickedInside = this.el.nativeElement.contains(event.target);

  if (!clickedInside) {
    this.showPropertyDropdown = false;
  }
}
 
  // ─── Property search logic ───────────────────────────────────────────────
onPropertyInput(): void {
  const q = this.propertySearch.trim().toLowerCase();
  this.selectedProperty = null;

  this.filteredProperties = this.allProperties.filter((p: any) =>
    (p.property_name || '').toLowerCase().includes(q) ||
    (p.property_no || '').toLowerCase().includes(q)
  );

  this.showPropertyDropdown = true;
}
 
openDropdown(): void {
  this.filteredProperties = [...this.allProperties]; // show all
  this.showPropertyDropdown = true;
}
 
selectProperty(prop: Property): void {
  this.selectedProperty = prop;
  this.propertySearch = prop.property_no; // ✅ CHANGED HERE
  this.showPropertyDropdown = false;
}
 
  clearProperty(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedProperty     = null;
    this.propertySearch       = '';
    this.filteredProperties   = [];
    this.showPropertyDropdown = false;
  }
 
  // ─── Derived helpers ─────────────────────────────────────────────────────
get isFormValid(): boolean {
  if (this.userType === 'association') {
    return !!this.selectedModule && this.description.trim().length > 0;
  }

  return (
    !!this.selectedModule &&
    this.description.trim().length > 0 &&
    !!this.selectedProperty
  );
}
 
  get descriptionError(): boolean {
    return this.submitted && !this.description.trim();
  }
 
  get propertyError(): boolean {
    return this.submitted && !this.selectedProperty;
  }
 
  get moduleError(): boolean {
    return this.submitted && !this.selectedModule;
  }
 
  // ─── Actions ─────────────────────────────────────────────────────────────
  onSubmit(): void {
    if (!this.isFormValid) return;
    
    this.btnstatusloading = true;
  const payload = {
    name: this.formatedfulluserData.name,
    email: this.formatedfulluserData.email,
    mobile: this.formatedfulluserData.mobile,
    hoa_admin_id: this.selectedProperty?.hoa_admin_id,

    association_name:
  this.selectedProperty?.association_name || this.formatedfulluserData.property_name || '',

    property_id: this.selectedProperty?._id || '',

    module_name: this.selectedModule,
    description: this.description.trim(),
  };

  console.log('Support ticket payload:', payload);

  this.apiService.createNewSupportTicket<any>(payload).subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.btnstatusloading = false;
        this.Toast.success(res.message, 'success');
        this.goback();
      } else {
        this.btnstatusloading = false;
        this.Toast.warning(res.message, 'warning');
      }
    },
    error: (err: any) => {
      this.btnstatusloading = false;
      this.Toast.error(err?.error?.message || 'Something went wrong', 'error');
    },
  });
}
 
  onCancel(): void {
    this.submitted        = false;
    this.propertySearch   = '';
    this.selectedProperty = null;
    this.selectedModule   = '';
    this.description      = '';
    this.filteredProperties   = [];
    this.showPropertyDropdown = false;
  }
}
 