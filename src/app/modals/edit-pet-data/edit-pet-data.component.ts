import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { ResidentServicesService } from '../../services/Resident/resident-services.service';

@Component({
  selector: 'app-edit-pet-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-pet-data.component.html',
  styleUrls: ['./edit-pet-data.component.css'],
})
export class EditPetDataComponent implements OnInit {
  @Input() PetDetails: any; // full property object or single pet object
  @Input() propertyId: any; // full property object or single pet object
  petForm!: FormGroup;
  submitbtn = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private Modal: ModalService,
    private Toast: ToastrService,
    private OwnerService: OwnerServiceService,
    private ResidentService : ResidentServicesService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.PetDetails) {
      this.patchPetData(this.PetDetails);
    }
    console.log('propertyId', this.propertyId);
  }

  initForm() {
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', Validators.required],
      ownedBy: ['', Validators.required],
    });
  }

  patchPetData(data: any) {
    const pet = Array.isArray(data) ? data[0] : data; // handle if it's a list
    this.petForm.patchValue({
      petName: pet.pet_name ?? '',
      type: pet.type ?? '',
      breed: pet.breed ?? '',
      age: pet.age ?? '',
      ownedBy: pet.pet_owned_by ? this.capitalize(pet.pet_owned_by) : '', // converts 'owner' -> 'Owner'
    });
  }

  capitalize(value: string): string {
    return value
      ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      : '';
  }

  isInvalid(field: string): boolean {
    const control = this.petForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  addPet() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    const payload = {
      id: this.propertyId, // assuming this is the unique ID
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
        this.OwnerService.triggerPetAdd(res);
          this.AssociationService.triggerAssociationpet(res);
          this.ResidentService.TriggerPetServiceinResident(res);

          console.log('Popup emitted data:', res);
          
          this.closeModal();
        } else {
           this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error(err.error.error.message, 'Failed');
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  closeModal() {
    this.Modal.close();
    console.log('Modal closed');
  }
}
