import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-tenant',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.css'
})
export class AddTenantComponent {

      constructor(private Modal : ModalService, private fb: FormBuilder){}
    
      closeModal(){
        this.Modal.close()
      }

       tenantForm!: FormGroup;


  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      rentedAt: ['', Validators.required],
      advancePaid: ['', [Validators.required, Validators.min(0)]],
      estimatedRent: ['', [Validators.required, Validators.min(0)]],
      maintenancePaidBy: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tenantForm.valid) {
      console.log('Form Data:', this.tenantForm.value);
      
    } else {
      this.tenantForm.markAllAsTouched();
    }
  }

}
