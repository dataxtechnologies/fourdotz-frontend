import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit {
  @Input() associationId: any;

  petForm!: FormGroup;
  submitbtn: boolean = true;

  constructor(
    private fb: FormBuilder,
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('this.associationId', this.associationId);

    // Initialize reactive form
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      ownedBy: ['', Validators.required],
    });
  }

  // Submit form
  addPet() {
    this.submitbtn = false;
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched(); // show validation errors
      return;
    }

    const payload = {
      id: this.associationId, // assuming this is the unique ID
      pet: [
        {
          pet_name: this.petForm.value.petName,
          type: this.petForm.value.type,
          breed: this.petForm.value.breed,
          age: this.petForm.value.age,
          pet_owned_by: this.petForm.value.ownedBy.toLowerCase(), // tenant/owner in lowercase
        },
      ],
    };

    this.apiService.Addpet<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message, 'Success')
          // this.AssociationService.triggerAssociationOwner(res);
          this.closeModal();
        } else {
           this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
         this.Toast.error(err.error.error.message, 'Failed')
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });

    
  }

  closeModal() {
    this.Modal.close();
  }

  // Helper for template validation
  isInvalid(controlName: string): boolean {
    const control = this.petForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}
