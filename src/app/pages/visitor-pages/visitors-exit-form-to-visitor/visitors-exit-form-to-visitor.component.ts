import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitors-exit-form-to-visitor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './visitors-exit-form-to-visitor.component.html',
  styleUrl: './visitors-exit-form-to-visitor.component.css',
})
export class VisitorsExitFormToVisitorComponent implements OnInit {
  visitorForm!: FormGroup;
  Gatelist2: any

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.listGate();
    // React to visitor_unique_id change
    this.route.params.subscribe((params) => {
      this.visitorForm
        .get('visitor_unique_id')
        ?.setValue(params['visitorUniqueId']);
    });

    // React to exit_status change
    this.visitorForm.get('exit_status')?.valueChanges.subscribe((status) => {
      if (status === 'exited_now') {
        this.visitorForm.get('exit_time')?.clearValidators();
        this.visitorForm.get('exit_time')?.updateValueAndValidity();
      } else {
        this.visitorForm.get('exit_time')?.setValidators([Validators.required]);
        this.visitorForm.get('exit_time')?.updateValueAndValidity();
      }
    });
  }

  buildForm() {
    this.visitorForm = this.fb.group({
      visitor_unique_id: ['', Validators.required],
      exit_status: ['', Validators.required], // 3-options selector
      exit_time: [''], // Dynamically required
    });
  }

  get f() {
    return this.visitorForm.controls;
  }

  // ------------------ SUBMIT EXIT FORM ------------------------------
  submitVisitorForm() {
    if (this.visitorForm.invalid) {
      this.visitorForm.markAllAsTouched();
      return;
    }

    const form = this.visitorForm.value;
    let finalExitTime = form.exit_time;

    // If exited_now → auto fill current time
    if (form.exit_status === 'exited_now') {
      finalExitTime = new Date().toISOString();
    }

    const payload = {
      visitor_no: form.visitor_unique_id,
      exit_status: form.exit_status,
      exit_time: finalExitTime,
      gate: form.gate_no,
      extension_time: form.exit_time,
    };

    console.log('Payload Sent:', payload);

    this.apiService.ExitQRVisitor<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.visitorForm.reset();
          this.router.navigateByUrl('/exit-form-submitted');
        } else {
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.Toast.error('Something went wrong', 'Failed');
      },
    });
  }

   listGate() {
    this.apiService.listGate<any>().subscribe({
      next: (res) => {
        if (res?.success) {
          this.Gatelist2 = res.data;
        } else {
          this.Gatelist2 = [];
        }
      },
      error: (err) => {
        console.log('err', err.error.message);
        this.Gatelist2 = [];
        console.log('err', err);
      },
    });
  }
}
