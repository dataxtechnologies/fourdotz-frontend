import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

type BlockType = 'heading' | 'paragraph' | 'signature';

interface SignatureSigner {
  name: string;
  signed: boolean;
  signedAt?: string;
}

interface Block {
  type: BlockType;
  value?: string;
  signers?: SignatureSigner[];
  includeDate?: boolean;
}

@Component({
  selector: 'app-create-template-association',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-template-association.component.html',
  styleUrl: './create-template-association.component.css',
})
export class CreateTemplateAssociationComponent {
  blocks: Block[] = [];
  headingAdded = false;
  signatureAdded = false;
  submitbtn= true

  /* VARIABLE MODAL */
  showVariableModal = false;
  variableForm = { key: '' };

  /* TEMPLATE NAME MODAL */
  showTemplateNameModal = false;
  templateName = '';

  /* CURSOR */
  private savedRange: Range | null = null;

  constructor(private ApiserviceService: ApiserviceService, private Toast: ToastrService, private router: Router) {}

  /* ADD BLOCKS */
  addHeading() {
    if (this.headingAdded) return;
    this.blocks.unshift({ type: 'heading', value: '' });
    this.headingAdded = true;
  }

  addParagraph() {
    this.blocks.push({ type: 'paragraph', value: '' });
  }

  openSignatureModal() {
    if (this.signatureAdded) return;

    const count = Number(prompt('How many signers?'));
    if (!count || count < 1) return;

    const signers: SignatureSigner[] = [];
    for (let i = 0; i < count; i++) {
      const name = prompt(`Signer ${i + 1} name`) || `Signer ${i + 1}`;
      signers.push({ name, signed: false });
    }

    this.blocks.push({
      type: 'signature',
      signers,
      includeDate: true,
    });

    this.signatureAdded = true;
  }

  /* EDITING */
  updateBlockValue(event: Event, index: number) {
    const el = event.target as HTMLElement;
    this.blocks[index].value = el.innerText;
    this.saveCursor();
  }

  /* CURSOR */
  saveCursor() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      this.savedRange = sel.getRangeAt(0);
    }
  }

  restoreCursor() {
    if (!this.savedRange) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(this.savedRange);
  }

  /* VARIABLE */
  openVariableModal() {
    this.saveCursor();
    this.variableForm.key = '';
    this.showVariableModal = true;
  }

  closeVariableModal() {
    this.showVariableModal = false;
  }

  addVariable() {
    if (!this.variableForm.key) return;

    this.restoreCursor();

    const span = document.createElement('span');
    span.className = 'variable';
    span.contentEditable = 'false';
    span.innerText = `{{${this.variableForm.key}}}`;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    range.insertNode(span);
    range.setStartAfter(span);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);

    this.closeVariableModal();
  }

  /* SAVE */
  openTemplateNameModal() {
    this.templateName = '';
    this.showTemplateNameModal = true;
  }

  closeTemplateNameModal() {
    this.showTemplateNameModal = false;
  }

  getAgreementStatus() {
    const sig = this.blocks.find((b) => b.type === 'signature');
    if (!sig || !sig.signers) {
      return { completed: false, pending: null };
    }
    const pending = sig.signers.find((s) => !s.signed);
    return {
      completed: !pending,
      pending: pending ? pending.name : null,
    };
  }

  extractVariablesFromBlocks() {
    const regex = /{{(.*?)}}/g;
    const variableMap = new Map<string, any>();

    this.blocks.forEach((block) => {
      if (!block.value) return;

      let match;
      while ((match = regex.exec(block.value)) !== null) {
        const key = match[1].trim();

        if (!variableMap.has(key)) {
          variableMap.set(key, {
            key,
            label: key
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            type: 'text',
          });
        }
      }
    });

    return Array.from(variableMap.values());
  }

  confirmSaveTemplate() {
    if (!this.templateName.trim()) {
      alert('Template name required');
      return;
    }

    this.submitbtn = false

    // const statusInfo = this.getAgreementStatus();

    const variables = this.extractVariablesFromBlocks(); // ✅ NEW

    const payload = {
      template_name: this.templateName.trim(),
      template_type: 'agreement',

      variables, // ✅ ARRAY OF OBJECTS
      blocks: this.blocks,

      meta: {
        created_by: 'association',
        created_at: new Date().toISOString(),
      },
    };

    // const payloadString = JSON.stringify(payload, null, 2);
    // navigator.clipboard.writeText(payloadString);

    // alert('Template payload copied to clipboard');

    this.ApiserviceService.CreateAgreementTemplates<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true
          this.Toast.success(res.message, 'Success')
          this.goback()
          this.closeTemplateNameModal();
        } else {
          this.submitbtn = true
          this.Toast.warning(res.message, 'Error')
          this.closeTemplateNameModal();
        }
      },
      error: (err: any) => {
        this.submitbtn = true
        this.Toast.error(err?.err?.error?.message, 'Error')
        this.closeTemplateNameModal();
      },
    });
  }

  goback(){
    this.router.navigateByUrl('/agreement/association/list-template')
  }
}
