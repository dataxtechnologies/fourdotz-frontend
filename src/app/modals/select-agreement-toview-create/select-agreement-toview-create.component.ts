import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-select-agreement-toview-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select-agreement-toview-create.component.html',
  styleUrl: './select-agreement-toview-create.component.css',
})
export class SelectAgreementToviewCreateComponent implements OnInit {
  templates: any[] = [];
  filteredTemplates: any[] = [];

  selectedTemplate: any = null;
  dropdownOpen = false;

  constructor(
    private modal: ModalService,
    private router: Router,
    private apiService: ApiserviceService
  ) {}

  ngOnInit(): void {
    this.listAgreementTemplates();
  }

  closeModal() {
    this.modal.close();
  }

  listAgreementTemplates() {
    this.apiService.ListAgreementTemplates<any>().subscribe({
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

    this.router.navigateByUrl(`/agreement/association/view-new-agreement/${this.selectedTemplate._id}`);

    this.closeModal();
  }
}
