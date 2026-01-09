import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { AddSignatureModalComponent } from '../../../modals/add-signature-modal/add-signature-modal.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css',
})
export class ViewTemplateComponent {
  @ViewChild('doc') doc!: ElementRef<HTMLDivElement>;
  templateHTML: string = '';
  parsedPayload: any;
  payload: any = {
    template_name: 'Rental Agreement – Residential',
    template_type: 'rental_agreement',
    created_by_role: 'association',
    status: 'active',
    document: {
      html: '<div _ngcontent-ng-c1469143329="" contenteditable="true" class="page"><div style="text-align: center;"><span style="font-size: 28px;">RENTAL AGREEMENT</span></div><div style="text-align: left;"><font style="font-size: 16px;">This Rental Agreement (“Agreement”) is made and executed on <span class="variable" contenteditable="false" draggable="true" data-key="agreement_date" data-label="Agreement Date" data-type="date">{{agreement_date}}</span> at <span class="variable" contenteditable="false" draggable="true" data-key="city_name" data-label="City Name" data-type="text">{{city_name}}</span>. This Agreement is entered into between <span class="variable" contenteditable="false" draggable="true" data-key="owner_name" data-label="Owner Name" data-type="text">{{owner_name}}</span>, residing at <span class="variable" contenteditable="false" draggable="true" data-key="owner_address" data-label="Owner Address" data-type="text">{{owner_address}}</span>, hereinafter referred to as the “Owner / Lessor”, and <span class="variable" contenteditable="false" draggable="true" data-key="tenant_name" data-label="Tenant Name" data-type="text">{{tenant_name}}</span>, residing at <span class="variable" contenteditable="false" draggable="true" data-key="tenant_address" data-label="Tenant Address" data-type="text">{{tenant_address}}</span>, hereinafter referred to as the “Tenant / Lessee”. The Owner and the Tenant shall individually be referred to as a “Party” and collectively as the “Parties”.</font></div><div style="text-align: left;"><font style="font-size: 16px;"><br></font></div><div style="text-align: left;"><font style="font-size: 20px;"><b>1. PROPERTY DETAILS</b></font>\nThe Owner hereby agrees to rent to the Tenant the residential premises situated at <span class="variable" contenteditable="false" draggable="true" data-key="property_address" data-label="Property Address" data-type="text">{{property_address}}</span> along with all fixtures, fittings, and amenities provided therein. The Tenant has inspected the premises and agrees that the property is in a fit and livable condition at the time of taking possession.\n\n<font style="font-size: 20px;"><b>2. TERM OF TENANCY</b></font>\nThe tenancy under this Agreement shall commence on <span class="variable" contenteditable="false" draggable="true" data-key="start_date" data-label="Start Date" data-type="date">{{start_date}}</span> and shall continue until <span class="variable" contenteditable="false" draggable="true" data-key="end_date" data-label="End Date" data-type="date">{{end_date}}</span>, unless terminated earlier in accordance with the terms of this Agreement. Any extension or renewal of the tenancy shall be subject to mutual written consent of both Parties.\n\n<font style="font-size: 20px;"><b>3. RENT AND PAYMENT</b></font>\nThe Tenant agrees to pay a monthly rent of ₹ <span class="variable" contenteditable="false" draggable="true" data-key="rent_amount" data-label="Rent Amount" data-type="number">{{rent_amount}}</span> to the Owner, which shall be payable on or before <span class="variable" contenteditable="false" draggable="true" data-key="rent_due_day" data-label="Rent Due Day" data-type="text">{{rent_due_day}}</span> of every calendar month. The rent shall be paid through <span class="variable" contenteditable="false" draggable="true" data-key="payment_mode" data-label="Payment Mode" data-type="text">{{payment_mode}}</span> or any other mode mutually agreed upon by the Parties. Any delay in payment beyond the agreed period may attract late charges as decided by the Owner.\n\n<font style="font-size: 20px;"><b>4. SECURITY DEPOSIT</b></font>\nAt the time of execution of this Agreement, the Tenant has paid a refundable security deposit of ₹ <span class="variable" contenteditable="false" draggable="true" data-key="deposit_amount" data-label="Deposit Amount" data-type="number">{{deposit_amount}}</span> to the Owner. The security deposit shall be returned to the Tenant at the time of vacating the premises after adjusting any unpaid rent, utility charges, or costs arising due to damages beyond normal wear and tear.</div><div style="text-align: left;"><br></div><div style="text-align: left;"><b><font style="font-size: 20px;">5. MAINTENANCE AND UTILITIES</font></b>\nThe Tenant shall maintain the premises in good condition and shall be responsible for minor repairs arising due to regular usage. All utility charges including electricity, water, gas, internet, and maintenance charges, if applicable, shall be borne by the Tenant unless otherwise agreed in writing by the Owner.\n\n<b><font style="font-size: 20px;">6. USE OF PREMISES</font></b>\nThe premises shall be used strictly for residential purposes only. The Tenant shall not sublet, assign, or transfer the premises or any part thereof to any third party without the prior written consent of the Owner.\n\n<b><font style="font-size: 20px;">7. DAMAGES AND REPAIRS\n</font></b>Any damage caused to the premises due to negligence, misuse, or willful acts of the Tenant shall be repaired at the Tenant’s expense. Normal wear and tear arising out of lawful use of the premises shall be excluded from such liability.\n\n<b><font style="font-size: 20px;">8. TERMINATION</font></b>\nEither Party may terminate this Agreement by providing <span class="variable" contenteditable="false" draggable="true" data-key="notice_period" data-label="Notice Period" data-type="text">{{notice_period}}</span> days’ prior written notice to the other Party. Upon termination, the Tenant shall vacate the premises peacefully and hand over vacant possession to the Owner in good condition.\n\n<b><font style="font-size: 20px;">9. GOVERNING LAW AND JURISDICTION</font></b>\nThis Agreement shall be governed and interpreted in accordance with the laws of India. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in <span class="variable" contenteditable="false" draggable="true" data-key="city_name" data-label="City Name" data-type="text">{{city_name}}</span>.\n\n<b><font style="font-size: 20px;">10. ENTIRE AGREEMENT</font></b>\nThis Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements, representations, or understandings relating to the subject matter herein.</div><div style="text-align: left;"><br></div><div style="text-align: left;"><b><font style="font-size: 18px;">SIGNATURES\n</font></b>IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.\n\n<b>OWNER / LESSOR</b>\n      <span class="signature-field" contenteditable="false" data-role="unknown">\n        [ SIGN HERE ]\n      </span>\nName: <span class="variable" contenteditable="false" draggable="true" data-key="owner_name" data-label="Owner Name" data-type="text">{{owner_name}}</span>\nDate: <span class="variable" contenteditable="false" draggable="true" data-key="owner_sign_date" data-label="Owner Sign Date" data-type="date">{{owner_sign_date}}</span>\n\n<b>TENANT / LESSEE</b>\n<span class="signature-field" contenteditable="false" data-role="unknown">\n        [ SIGN HERE ]\n      </span>\nName: <span class="variable" contenteditable="false" draggable="true" data-key="tenant_name" data-label="Tenant Name" data-type="text">{{tenant_name}}</span>\nDate: <span class="variable" contenteditable="false" draggable="true" data-key="tenant_sign_date" data-label="Tenant Sign Date" data-type="date">{{tenant_sign_date}}</span></div></div>',
      page_size: 'A4',
      orientation: 'portrait',
    },
    variables: [
      {
        key: 'agreement_date',
        label: 'Agreement Date',
        type: 'date',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'city_name',
        label: 'City Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'owner_name',
        label: 'Owner Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'owner_address',
        label: 'Owner Address',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'tenant_name',
        label: 'Tenant Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'tenant_address',
        label: 'Tenant Address',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'property_address',
        label: 'Property Address',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'start_date',
        label: 'Start Date',
        type: 'date',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'end_date',
        label: 'End Date',
        type: 'date',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'rent_amount',
        label: 'Rent Amount',
        type: 'number',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'rent_due_day',
        label: 'Rent Due Day',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'payment_mode',
        label: 'Payment Mode',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'deposit_amount',
        label: 'Deposit Amount',
        type: 'number',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'notice_period',
        label: 'Notice Period',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'city_name',
        label: 'City Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'owner_name',
        label: 'Owner Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'owner_sign_date',
        label: 'Owner Sign Date',
        type: 'date',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'tenant_name',
        label: 'Tenant Name',
        type: 'text',
        required: true,
        editable_by: ['owner'],
      },
      {
        key: 'tenant_sign_date',
        label: 'Tenant Sign Date',
        type: 'date',
        required: true,
        editable_by: ['owner'],
      },
    ],
    signature_fields: [
      {
        role: 'owner',
        label: 'Owner Signature',
        required: true,
        locked_after_sign: true,
      },
      {
        role: 'tenant',
        label: 'Tenant Signature',
        required: true,
        locked_after_sign: true,
      },
    ],
    audit: {
      created_at: '2026-01-07T12:33:07.210Z',
      created_by_id: 'ASSOC_102',
    },
  };

  variables: any[] = [];
  formData: any = {};

  showSignatureModal = false;
  activeSignElement!: HTMLElement;

  constructor(
    private Modal: ModalService,
    private associationService: AssociationServiceService
  ) {}

  ngOnInit() {
    this.parsedPayload = this.payload;

    // const rawhtml = this.parsedPayload.document.html;
    // this.templateHTML = this.convertRawTextToHTML(rawhtml);
    this.templateHTML = this.parsedPayload.document.html;

    this.variables = this.parsedPayload.variables.map((v: any) => ({
      key: v.key,
      label: v.label,
      type: v.type,
    }));

    setTimeout(() => {
      this.doc.nativeElement.innerHTML = this.templateHTML;
      this.attachSignatureClicks();
    });

    this.associationService.signature$.subscribe((html) => {
      if (!html) return;

      const el = this.associationService.getActiveField();
      if (!el) return;

      el.innerHTML = html;
      el.classList.add('signed');
    });
  }

  /* ================= VARIABLES ================= */
  extractVariables() {
    const div = document.createElement('div');
    div.innerHTML = this.templateHTML;

    const vars = div.querySelectorAll('.variable');
    vars.forEach((v: any) => {
      const key = v.getAttribute('data-key');
      if (!this.variables.find((x) => x.key === key)) {
        this.variables.push({
          key,
          label: v.getAttribute('data-label'),
          type: v.getAttribute('data-type'),
        });
      }
    });
  }

  /* ===== APPLY VALUES ===== */
  applyValues() {
    let html = this.templateHTML;

    this.variables.forEach((v) => {
      const val = this.formData[v.key] || '';
      html = html.replaceAll(`{{${v.key}}}`, val);
    });

    this.doc.nativeElement.innerHTML = html;

    setTimeout(() => {
      this.splitIntoPages();
      this.attachSignatureClicks();
    });
  }

  /* ===== AUTO A4 PAGE SPLIT ===== */
  splitIntoPages() {
    const container = this.doc.nativeElement;
    const pages = Array.from(
      container.querySelectorAll('.page')
    ) as HTMLElement[];

    const PAGE_HEIGHT = 1123;

    pages.forEach((page) => {
      if (page.scrollHeight <= PAGE_HEIGHT) return;

      const children = Array.from(page.children);
      let newPage = document.createElement('div');
      newPage.className = 'page';
      newPage.contentEditable = 'true';

      container.appendChild(newPage);

      for (let i = children.length - 1; i >= 0; i--) {
        newPage.prepend(children[i]);
        if (page.scrollHeight <= PAGE_HEIGHT) break;
      }
    });
  }

  convertRawTextToHTML(rawHtml: string): string {
    // 1. Create DOM container
    const wrapper = document.createElement('div');
    wrapper.innerHTML = rawHtml;

    // 2. Normalize fonts → paragraphs
    wrapper.querySelectorAll('font').forEach((font) => {
      const p = document.createElement('p');
      p.innerHTML = font.innerHTML;
      p.style.fontSize = font.style.fontSize || '16px';
      font.replaceWith(p);
    });

    // 3. Fix section headings (1. TITLE, 2. TITLE...)
    wrapper.querySelectorAll('p').forEach((p) => {
      const text = p.textContent?.trim() || '';

      if (/^\d+\.\s+[A-Z\s]+$/.test(text)) {
        p.classList.add('section-title');
      }
    });

    // 4. Fix SIGNATURES block
    wrapper.querySelectorAll('b').forEach((b) => {
      if (b.textContent?.trim() === 'SIGNATURES') {
        const h = document.createElement('h3');
        h.textContent = 'SIGNATURES';
        b.replaceWith(h);
      }
    });

    // 5. Ensure signature fields are block-level
    wrapper.querySelectorAll('.signature-field').forEach((sig) => {
      sig.classList.add('signature-block');
    });

    // 6. Wrap everything inside ONE page
    return `
    <div class="page" contenteditable="true">
      ${wrapper.innerHTML}
    </div>
  `;
  }

  attachSignatureClicks() {
    const fields =
      this.doc.nativeElement.querySelectorAll<HTMLElement>('.signature-field');

    console.log('Signature fields found:', fields.length);

    fields.forEach((el) => {
      if (el.classList.contains('signed')) return;

      el.onclick = () => {
        console.log('SIGN CLICKED'); // 👈 debug
        this.associationService.setActiveField(el);
        this.openSignModal();
      };
    });
  }

  placeSignature(signatureHTML: string) {
    this.activeSignElement.innerHTML = signatureHTML;
    this.showSignatureModal = false;
  }

  openSignModal() {
    this.Modal.open(AddSignatureModalComponent, {
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
}
