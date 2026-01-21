import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../../services/api/apiservice.service';

/* ================= TYPES ================= */

type BlockType = 'heading' | 'paragraph' | 'signature';

interface SignatureSigner {
  name: string;
  signed: boolean;
  signedAt?: string;
}

interface Block {
  id: number;
  type: BlockType;
  value: string;
  signers?: SignatureSigner[];
  includeDate?: boolean;
}

/* ================= COMPONENT ================= */

@Component({
  selector: 'app-create-template-association',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-template-association.component.html',
  styleUrls: ['./create-template-association.component.css'],
})
export class CreateTemplateAssociationComponent {
  blocks: Block[] = [];
  private idCounter = 1;

  headingAdded = false;
  signatureAdded = false;
  submitbtn = true;

  /* VARIABLE MODAL */
  showVariableModal = false;
  variableForm = { key: '' };

  /* TEMPLATE NAME MODAL */
  showTemplateNameModal = false;
  templateName = '';

  /* CURSOR */
  private savedRange: Range | null = null;

  constructor(
    private api: ApiserviceService,
    private toast: ToastrService,
    private router: Router
  ) {}

  /* ================= ADD BLOCKS ================= */

  addHeading() {
    if (this.headingAdded) return;

    this.blocks.push({
      id: this.idCounter++,
      type: 'heading',
      value: '',
    });

    this.headingAdded = true;
  }

  addParagraph() {
    this.blocks.push({
      id: this.idCounter++,
      type: 'paragraph',
      value: '',
    });
  }

 openSignatureModal() {
  if (this.signatureAdded) return;

  const count = Number(prompt('How many signers? (1 or 2 only)'));

  // ✅ Allow only 1 or 2
  if (!count || count < 1 || count > 2) {
    alert('Only 1 or 2 signers are allowed');
    return;
  }

  const signers: SignatureSigner[] = [];

  for (let i = 0; i < count; i++) {
    const name =
      prompt(`Signer ${i + 1} name`)?.trim() || `Signer ${i + 1}`;

    signers.push({
      name,
      signed: false,
    });
  }

  this.blocks.push({
    id: this.idCounter++,
    type: 'signature',
    value: '',
    signers,
    includeDate: true,
  });

  this.signatureAdded = true;
}

  /* ================= EDITING ================= */

  updateBlockValue(event: Event, block: Block) {
    const el = event.target as HTMLElement;
    block.value = el.innerHTML; // ✅ READ ONLY
  }

  /* ================= CURSOR ================= */

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

  /* ================= VARIABLES ================= */

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

    // 🔥 Sync block value after insert
    const editable = span.closest('.editable') as HTMLElement;
    if (editable) {
      const blockId = Number(editable.dataset['id']);
      const block = this.blocks.find((b) => b.id === blockId);
      if (block) {
        block.value = editable.innerHTML;
      }
    }

    this.closeVariableModal();
  }

  /* ================= VARIABLES EXTRACT ================= */

  extractVariablesFromBlocks() {
    const regex = /{{(.*?)}}/g;
    const map = new Map<string, any>();

    this.blocks.forEach((block) => {
      let match;
      while ((match = regex.exec(block.value)) !== null) {
        const key = match[1].trim();
        if (!map.has(key)) {
          map.set(key, {
            key,
            label: key
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            type: 'text',
          });
        }
      }
    });

    return Array.from(map.values());
  }

  /* ================= SAVE ================= */

  openTemplateNameModal() {
    this.templateName = '';
    this.showTemplateNameModal = true;
  }

  closeTemplateNameModal() {
    this.showTemplateNameModal = false;
  }

  confirmSaveTemplate() {
    if (!this.templateName.trim()) {
      this.toast.warning('Template name required');
      return;
    }

    this.submitbtn = false;

    const variables = this.extractVariablesFromBlocks();

    if (variables.length === 0) {
      this.toast.warning('No variables added');
      this.submitbtn = true;
      return;
    }

    const payload = {
      template_name: this.templateName.trim(),
      template_type: 'agreement',
      variables,
      blocks: this.blocks,
      meta: {
        created_by: 'association',
        created_at: new Date().toISOString(),
      },
    };

    console.log('PAYLOAD:', payload);

    this.api.CreateAgreementTemplates<any>(payload).subscribe({
      next: (res: any) => {
        this.submitbtn = true;
        if (res?.success) {
          this.toast.success(res.message || 'Template created');
          this.closeTemplateNameModal();
          this.goback();
        } else {
          this.toast.warning(res.message || 'Failed');
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.toast.error(err?.error?.message || 'Server error');
      },
    });
  }

  /* ================= UTIL ================= */

  trackById(index: number, block: Block) {
    return block.id;
  }

  goback() {
    this.router.navigateByUrl('/agreement/association/list-template');
  }
}
