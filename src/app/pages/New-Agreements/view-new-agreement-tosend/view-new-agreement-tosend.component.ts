import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-new-agreement-tosend',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-new-agreement-tosend.component.html',
  styleUrl: './view-new-agreement-tosend.component.css',
})
export class ViewNewAgreementTosendComponent implements OnInit {
  template: any = null;
  AgreementId: string | null = null;
  AgId : any
  Savesignloading = false

  /* ===== VARIABLES ===== */
  variables: Record<string, string> = {};
  variableKeys: string[] = [];

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private Toast: ToastrService,
    private Router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.AgreementId = params['templateId'] || null;
      if (this.AgreementId) {
        this.loadTemplate(this.AgreementId);
      }
    });
  }

  /* ===== LOAD TEMPLATE ===== */
  loadTemplate(id: string) {
    this.apiService.listAgreementbyId<any>(id).subscribe({
      next: (res) => {
        if (res?.success) {
          this.template = res.data;
          this.initVariablesFromApi();
        }
      },
      error: () => {
        this.template = null;
      },
    });
  }

  /* ===== INIT VARIABLES FROM API ===== */
  initVariablesFromApi() {
    if (!this.template?.variables) return;

    this.template.variables.forEach((v: any) => {
      this.variables[v.key] = '';
      this.variableKeys.push(v.key);
    });
  }

  /* ===== REPLACE VARIABLES ===== */
  renderText(text: string): string {
    if (!text) return '';

    return text.replace(/{{(.*?)}}/g, (_, key) => {
      const k = key.trim();
      return this.variables[k] || '__________';
    });
  }

  trackByKey(index: number, key: string) {
    return key;
  }

  /* ===== BUILD VARIABLE PAYLOAD ===== */
  buildVariablePayload() {
    if (!this.template?.variables) return [];

    return this.template.variables.map((v: any) => ({
      key: v.key,
      label: v.label,
      type: v.type,
      value: this.variables[v.key] || '',
    }));
  }

  saveAndSignAgreement() {
    this.Savesignloading = true
    const payload = this.buildFinalPayload();

    console.log('FINAL PAYLOAD (MATCHING REQUIRED STRUCTURE) 👉', payload);

    this.apiService.CreateAgreementtosign<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Savesignloading = false
          this.AgId = res.data
          this.Toast.success(res.message, 'Success');
          this.gonext();
        } else {
          this.Savesignloading = false
          this.Toast.warning(res.message, 'Error');
        }
      },
      error: (err: any) => {
        this.Savesignloading = false
        this.Toast.error(
          err?.error?.message || 'Something went wrong',
          'Error'
        );
      },
    });
  }

  updateTemplateVariables() {
    if (!this.template?.variables) return;

    this.template.variables = this.template.variables.map((v: any) => ({
      ...v,
      value: this.variables[v.key] || '',
    }));
  }

  buildFinalPayload() {
    this.updateTemplateVariables();

    const { created_time, ...cleanTemplate } = this.template;

    return {
      template_id: this.AgreementId,
      template_name: this.template.template_name,
      agreement: {
        ...cleanTemplate,
      },
    };
  }

  gonext() {
    this.Router.navigateByUrl(
      `/agreement/association/view-signing-agreement/${this.AgId}`
    );
  }

  goback() {
    this.Router.navigateByUrl('/agreement/association/list-agreement');
  }
}
