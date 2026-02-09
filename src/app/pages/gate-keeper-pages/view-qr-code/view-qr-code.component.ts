import { Component } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-qr-code',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-qr-code.component.html',
  styleUrl: './view-qr-code.component.css'
})
export class ViewQrCodeComponent {


  qrimagedata: any
  noqr = true;
  associationId: any

  constructor(private apiService: ApiserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData.hoa_admin_id;
    }
    this.GetAssociationQR(this.associationId);
  }


    GetAssociationQR(data :any) {
    this.apiService.GetAssociationQRforvisitor<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success && res?.data?.qr_code) {
          this.qrimagedata = res.data;
          this.noqr = false;
        } else {
          this.noqr = true;
        }
      },
      error: () => {
        this.noqr = true;
      },
    });
  }

}
