import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxQrcodeStylingComponent,
  NgxQrcodeStylingService,
  Options,
} from 'ngx-qrcode-styling';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiserviceService } from '../../../services/api/apiservice.service';

@Component({
  selector: 'app-generate-qr-association',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxQrcodeStylingComponent],
  templateUrl: './generate-qr-association.component.html',
  styleUrls: ['./generate-qr-association.component.css'],
})
export class GenerateQrAssociationComponent implements OnInit {
  @ViewChild('qrCodeRef', { static: false })
  qrCodeRef!: NgxQrcodeStylingComponent;
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  @ViewChild('qrBox', { static: false }) qrBox!: ElementRef;

  size: number = 250;
  associationAdminId: any = localStorage.getItem('user_id');
  dotsOptions: any = 'square';
  corner_square_eye_option: any = 'square';
  corner_dot_eye_option: any = 'square';
  background_color: string = '#ffffff';
  pattern_color: string = '#000';
  logoDataURL: string = 'assets/logo/fourdotz1.png';
  userURL: string = `https://dashboard.fourdotz.com/visitor-entry-form/${this.associationAdminId}`; //production
  // userURL: string = `https://dev.fourdotz.com/visitor-entry-form/${this.associationAdminId}`; //development

  customiseoptions = true; // 👉 Start in customise mode
  noqr = true;
  qrimagedata: any = null;
  // notsavedqr = false;

  config: Options = {
    width: 250,
    height: 250,
    data: `https://dashboard.fourdotz.com/visitor-entry-form/${this.associationAdminId}`, //production
    // data: `https://dev.fourdotz.com/visitor-entry-form/${this.associationAdminId}`, //development
    image: this.logoDataURL,
    dotsOptions: {
      color: '#000',
      type: 'square',
    },
    cornersSquareOptions: {
      type: 'square',
    },
    cornersDotOptions: {
      type: 'square',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'Q',
    },
  };

  constructor(
    private qrcodeService: NgxQrcodeStylingService,
    private apiService: ApiserviceService
  ) {}

  ngOnInit(): void {
    this.GetAssociationQR();
  }

  // this.updateQRCode();

  // ▶ Fetch saved QR from API
  GetAssociationQR() {
    this.apiService.GetAssociationQR<any>().subscribe({
      next: (res: any) => {
        if (res?.success && res?.data?.qr_code) {
          this.qrimagedata = res.data;
          this.customiseoptions = false; // show saved QR
          this.noqr = false;
        } else {
          this.customiseoptions = true; // show QR generator
          this.noqr = true;
        }
      },
      error: () => {
        this.customiseoptions = true;
        this.noqr = true;
      },
    });
  }

  downloadPDF() {
    const DATA = this.pdfContent.nativeElement;

    html2canvas(DATA, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Visitor-QR.pdf');
    });
  }

  private getCanvas(): HTMLCanvasElement | null {
    return this.qrBox?.nativeElement.querySelector('canvas') || null;
  }

  private getQRBlob(): Promise<Blob> {
    const canvas = this.getCanvas();
    if (!canvas) return Promise.resolve(new Blob());

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob || new Blob()), 'image/png');
    });
  }
  async onSaveQR() {
    const blob = await this.getQRBlob();
    const file = new File([blob], 'association-qr.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('association_id', this.associationAdminId);
    formData.append('qr_code', file);

    this.apiService.SaveQRcodeAssociation<any>(formData).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.downloadPDF(); // Only on success
          this.GetAssociationQR();
        } else {
          alert('Failed to save QR');
        }
      },
      error: () => {
        alert('Something went wrong while saving QR');
      },
    });
  }

  updateQRCode() {
    this.noqr = false;
    if (!this.qrCodeRef) return;

    const configUpdate: Options = {
      width: this.size,
      height: this.size,
      data: this.userURL,
      image: this.logoDataURL,
      dotsOptions: {
        color: this.pattern_color,
        type: this.dotsOptions,
      },
      cornersSquareOptions: {
        type: this.corner_square_eye_option,
      },
      cornersDotOptions: {
        type: this.corner_dot_eye_option,
      },
      backgroundOptions: {
        color: this.background_color,
      },
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
      },
    };

    this.qrCodeRef.update(this.config, configUpdate);
  }

  update_pattern(dot_option: any) {
    this.dotsOptions = dot_option;
    this.updateQRCode();
  }

  update_eye(
    corner_square_eye_option: any,
    corner_dot_eye_option: any,
    dot_type: any
  ) {
    this.corner_square_eye_option = corner_square_eye_option;
    this.corner_dot_eye_option = corner_dot_eye_option;
    this.dotsOptions = dot_type;
    this.updateQRCode();
  }

  on_background_ColorChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.background_color = inputElement.value;
    this.updateQRCode();
  }

  on_pattern_ColorChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.pattern_color = inputElement.value;
    this.updateQRCode();
  }

  downloadQR() {
    if (!this.qrCodeRef) return;
    this.qrCodeRef.download('qr-code.png');
  }
}
