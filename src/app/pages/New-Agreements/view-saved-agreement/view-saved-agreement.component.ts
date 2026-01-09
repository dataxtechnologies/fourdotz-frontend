import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Block {
  type: 'heading' | 'paragraph' | 'signature';
  value?: string;
  signNames?: string[];
  includeDate?: boolean;
}

@Component({
  selector: 'app-view-saved-agreement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-saved-agreement.component.html',
  styleUrl: './view-saved-agreement.component.css',
})
export class ViewSavedAgreementComponent implements OnInit {
 /* ===== TEMPLATE ===== */
  template = {
    template_name: 'Agreement Template',
    blocks: [] as Block[],
  };

  /* ===== VARIABLES ===== */
  variables: Record<string, string> = {};
  variableKeys: string[] = []; // ✅ STABLE ARRAY

  ngOnInit() {
    // 🔹 STATIC DATA (your response)
    this.template.blocks = [
    {
      "type": "heading",
      "value": "Rental Agreement"
    },
    {
      "type": "paragraph",
      "value": "This Rental Agreement (“Agreement”) is made and executed on {{agreement_date}} at {{city_name}}, between {{owner_name}}, residing at {{owner_address}}, hereinafter referred to as the “Lessor” (which expression shall, unless repugnant to the context, include his/her heirs, legal representatives, successors, and assigns), of the ONE PART; and {{tenant_name}}, residing at , hereinafter referred to as the “Lessee” (which expression shall, unless repugnant to the context, include his/her heirs, legal representatives, successors, and assigns), of the OTHER PART."
    },
    {
      "type": "paragraph",
      "value": "WHEREAS the Lessor is the absolute and lawful owner of the residential premises situated at {{property_address}}, consisting of , and the Lessee has approached the Lessor with a request to take the said premises on rent for residential purposes only."
    },
    {
      "type": "paragraph",
      "value": "The Lessee shall use the rented premises solely for residential purposes and shall not use the premises for any illegal, commercial, or unlawful activities. The Lessee shall maintain the premises in good condition and shall be responsible for any damages caused beyond normal wear and tear."
    },
    {
      "type": "paragraph",
      "value": "The Lessee shall not sublet, assign, or part with possession of the rented premises or any portion thereof to any third party without the prior written consent of the Lessor."
    },
    {
      "type": "paragraph",
      "value": "The Lessor shall ensure peaceful possession and enjoyment of the premises by the Lessee during the tenancy period, provided the Lessee complies with all terms and conditions of this Agreement."
    },
    {
      "type": "paragraph",
      "value": "The Lessee shall bear and pay all charges relating to electricity, water, gas, internet, maintenance, and other utilities consumed in the premises during the tenancy period. Property tax and structural maintenance shall be borne by the Lessor."
    },
    {
      "type": "paragraph",
      "value": "Either party may terminate this Agreement by giving  days’ prior written notice to the other party. In case of early termination by the Lessee, the security deposit shall be refunded subject to deductions, if any, after settlement of accounts."
    },
    {
      "type": "signature",
      "signNames": [
        "Owner",
        "Tenant"
      ],
      "includeDate": true
    },
    {
      "type": "paragraph",
      "value": "\n"
    }
  ];

    this.extractVariables();
  }

  /* ===== EXTRACT VARIABLES ===== */
    /* ===== EXTRACT VARIABLES ===== */
  extractVariables() {
    const regex = /{{(.*?)}}/g;

    this.template.blocks.forEach((block) => {
      if (!block.value) return;

      let match;
      while ((match = regex.exec(block.value)) !== null) {
        const key = match[1].trim();

        if (!(key in this.variables)) {
          this.variables[key] = '';
          this.variableKeys.push(key); // ✅ push once
        }
      }
    });
  }

  /* ===== REPLACE VARIABLES ===== */
  renderText(text: string): string {
    return text.replace(/{{(.*?)}}/g, (_, key) => {
      return this.variables[key.trim()] || '__________';
    });
  }

  /* ===== TRACK BY (OPTIONAL BUT GOOD) ===== */
  trackByKey(index: number, key: string) {
    return key;
  }
}
