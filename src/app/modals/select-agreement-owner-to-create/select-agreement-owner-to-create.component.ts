import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';
@Component({
  selector: 'app-select-agreement-owner-to-create',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select-agreement-owner-to-create.component.html',
  styleUrl: './select-agreement-owner-to-create.component.css',
})
export class SelectAgreementOwnerToCreateComponent {
  templates: any[] = [];
  filteredTemplates: any[] = [];
  associationid: any;

  selectedTemplate: any = null;
  dropdownOpen = false;

  constructor(
    private modal: ModalService,
    private router: Router,
    private apiService: ApiserviceService
  ) {}

  ngOnInit(): void {
    this.getpropertiesdata();
    
    
  }

  closeModal() {
    this.modal.close();
  }

  listAgreementTemplates(data: any) {
    this.apiService.OwnerListTemplatebyAssociation<any>(data).subscribe({
      next: (res) => {
        if (res?.success) {
          this.templates = res.data || [];
          this.filteredTemplates = [...this.templates];
        } else {
          this.templates = [];
          this.filteredTemplates = [];
        }
      },
      error: () => {
        this.templates = [];
        this.filteredTemplates = [];
      },
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredTemplates = this.templates.filter((t) =>
      t.template_name.toLowerCase().includes(value)
    );
  }

  selectTemplate(template: any) {
    this.selectedTemplate = template;
    this.dropdownOpen = false;
  }

  proceed() {
    if (!this.selectedTemplate) return;

    this.router.navigateByUrl(
      `/agreement/association/view-new-agreement/${this.selectedTemplate._id}`
    );

    this.closeModal();
  }

 getpropertiesdata() {
  this.apiService.ownerproperties<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        this.associationid = res.data[0].hoa_admin_id;
        this.listAgreementTemplates(this.associationid);
        console.log('this.associationid', this.associationid);
      } else {
        this.associationid = null;
      }
    },
    error: (err: any) => {
      this.associationid = null;
    },
  });
}

}
