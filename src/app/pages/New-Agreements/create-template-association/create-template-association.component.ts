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
  activeEditable: HTMLElement | null = null;
  blocks: Block[] = [];
  private idCounter = 1;

  /* SIGNATURE MODAL STATE (NEW ADD — NOT REPLACING OLD LOGIC) */
  showSignModal = false;
  signerCount = 1;
  signerInputs: string[] = [''];
  includeDate = true;

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
  ) { }

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

  /* EXISTING SIGNATURE LOGIC KEPT */
  openSignatureModal() {
  if (this.signatureAdded) return;

  // reset modal values
  this.signerCount = 1;
  this.signerInputs = [''];
  this.includeDate = true;

  // open modal
  this.showSignModal = true;
}

  /* ================= DELETE BLOCK (NEW FEATURE) ================= */

  removeBlock(block: Block) {
    const hasContent = block.value?.trim();

    if (hasContent) {
      const confirmDelete = confirm('Remove this content?');
      if (!confirmDelete) return;
    }

    this.blocks = this.blocks.filter(b => b.id !== block.id);

    if (block.type === 'heading') this.headingAdded = false;
    if (block.type === 'signature') this.signatureAdded = false;
  }

  /* ================= EDITING ================= */

updateBlockValue(event: Event, block: Block) {

  const el = event.target as HTMLElement;

  // Only read value
  block.value = el.innerHTML;

  // DO NOT modify el.innerHTML here
  // DO NOT sanitize here
}


  onEditableFocus(event: FocusEvent) {
    const el = event.target as HTMLElement;
    this.activeEditable = el;
    this.saveCursor();
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
  this.saveCursor(); // Save cursor before modal steals focus
  this.variableForm.key = '';
  this.showVariableModal = true;
}

  closeVariableModal() {
    this.showVariableModal = false;
  }

  addVariable() {

  if (!this.variableForm.key) return;

  if (!this.savedRange) {
    this.toast.warning('Place cursor inside typing area');
    return;
  }

  const container = this.savedRange.commonAncestorContainer;

  let parentElement: HTMLElement | null = null;

  if (container.nodeType === Node.TEXT_NODE) {
    parentElement = container.parentElement;
  } else {
    parentElement = container as HTMLElement;
  }

  // ✅ Check if saved cursor was inside editable area
  if (!parentElement || !parentElement.closest('.editable')) {
    this.toast.warning('Place cursor inside typing area');
    return;
  }

  // 🔥 Restore cursor before inserting
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(this.savedRange);

  const span = document.createElement('span');
  span.className = 'variable';
  span.contentEditable = 'false';
  span.innerText = `{{${this.variableForm.key}}}`;

  this.savedRange.insertNode(span);
  this.savedRange.setStartAfter(span);
  this.savedRange.collapse(true);

  selection?.removeAllRanges();
  selection?.addRange(this.savedRange);

  // Update block value
  const editableEl = parentElement.closest('.editable') as HTMLElement;
  const blockId = Number(editableEl.dataset['id']);
  const block = this.blocks.find(b => b.id === blockId);

  if (block) {
    block.value = editableEl.innerHTML;
  }

  this.closeVariableModal();
}

removeVariable(key: string) {

  const variableText = `{{${key}}}`;

  for (const block of this.blocks) {

    if (!block.value) continue;

    if (block.value.includes(variableText)) {

      // Remove ONLY first occurrence
      block.value = block.value.replace(variableText, '');

      // Update DOM
      const editable = document.querySelector(
        `[data-id="${block.id}"]`
      ) as HTMLElement;

      if (editable) {
        editable.innerHTML = block.value;
      }

      this.toast.success('Variable removed');
      return; // STOP after removing one
    }
  }

  this.toast.warning('Variable not found');
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

  // 🚫 Signature mandatory
  if (!this.signatureAdded) {
    this.toast.warning('Add signature area before saving template');
    return;
  }

  this.templateName = '';
  this.showTemplateNameModal = true;
}

  closeTemplateNameModal() {
    this.showTemplateNameModal = false;
  }

  confirmSaveTemplate() {
  if (!this.signatureAdded) {
    this.toast.warning('Signature section required');
    return;
  }

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


updateSignerInputs() {
  const count = Number(this.signerCount);

  if (count === 1) {
    this.signerInputs = [''];
  } else if (count === 2) {
    this.signerInputs = ['', ''];
  }
}

  /* CONFIRM SIGNATURE */
  confirmSignature() {

  const signers: SignatureSigner[] = [];

  for (let i = 0; i < this.signerInputs.length; i++) {
    signers.push({
      name: this.signerInputs[i] || `Signer ${i + 1}`,
      signed: false
    });
  }

  this.blocks.push({
    id: this.idCounter++,
    type: 'signature',
    value: '',
    signers,
    includeDate: this.includeDate
  });

  this.signatureAdded = true;
  this.showSignModal = false;
}
trackByIndex(index: number) {
  return index;
}

updateSignerName(index: number, value: string) {
  this.signerInputs[index] = value;
}

keepModalFocus(event: Event) {
  const input = event.target as HTMLInputElement;
  setTimeout(() => input.focus(), 0);
}

handleEditorEnter(event: KeyboardEvent, block: Block) {

  if (event.key !== 'Enter') return;

  event.preventDefault();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  // SHIFT + ENTER → line break
  if (event.shiftKey) {
    const br = document.createElement('br');
    range.insertNode(br);
    range.setStartAfter(br);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  // ENTER → create NEW paragraph block
  this.blocks.push({
    id: this.idCounter++,
    type: 'paragraph',
    value: ''
  });

  setTimeout(() => {
    const last = document.querySelector('[data-id="' + (this.idCounter - 1) + '"]') as HTMLElement;
    last?.focus();
  });
}

handleEditorKeydown(event: KeyboardEvent, block: Block) {

  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();

    // SHIFT + ENTER disabled completely
    if (event.shiftKey) {
      return;
    }

    // ENTER → create new paragraph block
    this.blocks.push({
      id: this.idCounter++,
      type: 'paragraph',
      value: ''
    });

    setTimeout(() => {
      const el = document.querySelector('[data-id="' + (this.idCounter - 1) + '"]') as HTMLElement;
      el?.focus();
    });

    return;
  }

  // BACKSPACE on empty block → remove block
  if (event.key === 'Backspace') {

    const target = event.target as HTMLElement;

    if (target.innerText.trim() === '') {
      event.preventDefault();
      this.removeBlock(block);
    }
  }
}

}
