import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'ngx-modal-ease';
import { AddSignatureModalComponent } from '../../../modals/add-signature-modal/add-signature-modal.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { SendAgreementToUserComponent } from '../../../modals/send-agreement-to-user/send-agreement-to-user.component';

@Component({
  selector: 'app-owner-view-signing-agreement',
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-view-signing-agreement.component.html',
  styleUrl: './owner-view-signing-agreement.component.css'
})
export class OwnerViewSigningAgreementComponent {
template: any = null;
  AgreementId: any;

  /* ===== VARIABLES MAP ===== */
  variables: Record<string, string> = {};
  currentUserId = localStorage.getItem('user_id');

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private Toast: ToastrService,
    private Router: Router,
    private modal: ModalService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.AgreementId = params['templateId'] || null;
      if (this.AgreementId) {
        this.ViewCreatedAgreementbyId(this.AgreementId);
      }
    });

    this.AssociationService.NewAgreementSignedStatus$.subscribe((Signed) => {
      if (Signed) {
        this.ViewCreatedAgreementbyId(this.AgreementId);
      }
    });
  }

  /* ===== LOAD CREATED AGREEMENT ===== */
  ViewCreatedAgreementbyId(id: string) {
    this.apiService.ViewCreatedAgreementbyId<any>(id).subscribe({
      next: (res) => {
        if (res?.success) {
          // IMPORTANT: agreement is nested
          this.template = res.data.agreement;
          this.initVariablesFromApi();
        }
      },
      error: () => {
        this.template = null;
        this.Toast.error('Failed to load agreement');
      },
    });
  }


getSignatureSigners(): any[] {
  if (!this.template?.blocks) return [];

  const block = this.template.blocks.find(
    (b: any) => b.type === 'signature'
  );

  return block?.signers || [];
}

isFirstSignerSigned(): boolean {
  const signers = this.getSignatureSigners();
  return signers.length > 0 && signers[0].signed === true;
}

isSecondSignerSigned(): boolean {
  const signers = this.getSignatureSigners();
  return signers.length > 1 && signers[1].signed === true;
}

areBothSignersSigned(): boolean {
  const signers = this.getSignatureSigners();
  return signers.length > 1 && signers.every(s => s.signed === true);
}

/* ===== FORMAT SIGNED DATE ===== */
getSignedDate(signer: any): string {
  return signer?.signed_date
    ? signer.signed_date
    : 'Not signed yet';
}

  /* ===== INIT VARIABLES WITH VALUES ===== */
  initVariablesFromApi() {
    if (!this.template?.variables) return;

    this.variables = {};

    this.template.variables.forEach((v: any) => {
      this.variables[v.key] = v.value || '';
    });
  }

  /* ===== RENDER TEXT WITH VALUES ===== */
renderText(html: string): string {
  if (!html) return '';

  // 1️⃣ Replace variable spans
  let output = html.replace(
    /<span class="variable"[^>]*>{{(.*?)}}<\/span>/g,
    (_match, key) => {
      const k = key.trim();
      return this.variables[k] || '__________';
    }
  );

  // 2️⃣ Convert &nbsp; to normal spaces
  output = output.replace(/&nbsp;/g, ' ');

  return output;
}


  /* ===== OPEN SIGNATURE MODAL ===== */
  openSignModal() {
    const signatureBlock = this.template.blocks.find(
      (b: any) => b.type === 'signature'
    );

    const signers = signatureBlock?.signers || [];

    if (!signers.length) {
      this.Toast.warning('No signers found');
      return;
    }

    this.modal.open(AddSignatureModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        agreementId: this.AgreementId,
        signers: signers,
        agreement: this.template,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  /* ===== NAVIGATION ===== */
  goback() {
    this.Router.navigateByUrl('/agreement/owner/list-signing-agreement');
  }


  sendAgreementUser(){
    this.modal.open(SendAgreementToUserComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        agreementId: this.AgreementId,
        by : 'association'
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
}
