import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type BlockType = 'heading' | 'paragraph' | 'signature';

interface Block {
  type: BlockType;
  value?: string;
  signNames?: string[];
}

@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent {
  /* ================= BLOCKS ================= */
  blocks: Block[] = [];

  headingAdded = false;
  signatureAdded = false;

  /* ================= VARIABLE MODAL ================= */
  showVariableModal = false;
  variableForm = { key: '' };

  public lastFocusedBlockIndex: number | null = null;

  /* ================= ADD BLOCKS ================= */

  addHeading() {
    if (this.headingAdded) return;

    this.blocks.unshift({
      type: 'heading',
      value: '',
    });

    this.headingAdded = true;
  }

  addParagraph() {
    this.blocks.push({
      type: 'paragraph',
      value: '',
    });
  }

  addSignature() {
    if (this.signatureAdded) return;

    const count = Number(prompt('How many signers?'));
    if (!count || count < 1) return;

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(`Signer ${i + 1}`);
    }

    this.blocks.push({
      type: 'signature',
      signNames: names,
    });

    this.signatureAdded = true;
  }

  /* ================= EDITING ================= */

  updateBlockValue(event: Event, index: number) {
    const el = event.target as HTMLElement;
    this.blocks[index].value = el.innerText;
    this.lastFocusedBlockIndex = index;
  }

  updateSignName(event: Event, blockIndex: number, signIndex: number) {
    const el = event.target as HTMLElement;
    this.blocks[blockIndex].signNames![signIndex] = el.innerText;
  }

  /* ================= VARIABLES ================= */

  openVariableModal() {
    if (this.lastFocusedBlockIndex === null) {
      alert('Click inside a paragraph to add variable');
      return;
    }
    this.variableForm.key = '';
    this.showVariableModal = true;
  }

  closeVariableModal() {
    this.showVariableModal = false;
  }

  addVariable() {
    if (!this.variableForm.key || this.lastFocusedBlockIndex === null) return;

    const variable = `{{${this.variableForm.key}}}`;
    this.blocks[this.lastFocusedBlockIndex].value =
      (this.blocks[this.lastFocusedBlockIndex].value || '') + variable;

    this.closeVariableModal();
  }

  /* ================= SAVE ================= */

  saveTemplate() {
    const payload = {
      blocks: this.blocks,
      created_at: new Date().toISOString(),
    };

    console.log('FINAL TEMPLATE PAYLOAD:', payload);
    alert('Template logged in console');
  }
}
