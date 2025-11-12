import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-maintenance-invoice-payment',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './maintenance-invoice-payment.component.html',
  styleUrl: './maintenance-invoice-payment.component.css',
})
export class MaintenanceInvoicePaymentComponent {
  isPaid: any;
  invoiceItems: any;
  totalVisibleRows = 11;
  tenantDetailsdatashow = false;
  MaintenanceInvoicedetails: any;
  globalloading = true
  payment_status : any
  userType : any
invoiceId : any
status : any

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private Router: Router
  ) {}

  ngOnInit() {
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceid');
    this.status = this.route.snapshot.queryParamMap.get('status');

    const storeduserType = localStorage.getItem('user_type');
    const storedtoken = localStorage.getItem('access_token');

    if (this.userType == storeduserType && storedtoken) {
      console.log(this.userType, this.invoiceId, this.status);
      this.MaintenanceInvoicegetbyID(this.invoiceId);
      // if(status === 'paynow'){
      //   this.CreatePaymentforInvoiceId(invoiceId)
      // }
    } else {
      this.confirmlogout();
    }
  }

  get fillerRows() {
    const emptyCount = this.totalVisibleRows - 2;
    return Array(emptyCount > 0 ? emptyCount : 0);
  }

  confirmlogout() {
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.clearSessionAndRedirect(
            res.message || 'Logged out successfully'
          );
          this.Toast.success(res.message);
        } else {
          this.Toast.error(res.message || 'Logout failed', 'Failed');
        }
      },
      error: (err: any) => {
        this.Toast.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.clearSessionAndRedirect();
      },
    });
  }

  MaintenanceInvoicegetbyID(data: any) {
    this.globalloading = true
    this.apiService.MaintenanceInvoicegetbyID<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.MaintenanceInvoicedetails = res.data;
          const residenttype = this.MaintenanceInvoicedetails.resident_type;
          this.invoiceItems = this.MaintenanceInvoicedetails.items;
          this.payment_status = this.MaintenanceInvoicedetails.payment_status;
          if(this.payment_status === false && this.status == 'paynow'){
            this.CreatePaymentforInvoiceId(this.MaintenanceInvoicedetails.invoice_no)
          }
          if (residenttype == 'tenant') {
            this.tenantDetailsdatashow = true;
          } else {
            this.tenantDetailsdatashow = false;
          }
          //   this.clearSessionAndRedirect(
          //     res.message || 'Logged out successfully'
          //   );
          //   this.Toast.success(res.message);
          // } else {
          //   this.Toast.error(res.message || 'Logout failed', 'Failed');
        }
      },
      error: (err: any) => {
        this.Toast.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.clearSessionAndRedirect();
      },
    });
  }

   CreatePaymentforInvoiceId(data: any) {
  const payload = {
    invoice_no: data
  };

  console.log('payload', payload);

  this.apiService.CreatePaymentforInvoiceId<any>(payload).subscribe({
    next: (res: any) => {
      if (res?.success && res.data?.redirectUrl) {
        console.log('Payment created successfully:', res);

        // ✅ Redirect to PhonePe payment page
        window.location.href = res.data.redirectUrl;
      } else {
        console.warn('Payment creation failed:', res?.message);
      }
    },
    error: (err: any) => {
      console.error('Error creating payment:', err);
    },
  });
}

  private clearSessionAndRedirect(message: string = 'Session expired') {
    localStorage.clear();
    this.Router.navigateByUrl('/auth/sign-in');
  }

  formatInvoiceType(value: string): string {
    if (!value) return '';

    return value
      .split('_') // Split by underscore
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize each word
      )
      .join(' '); // Join back with spaces
  }

  convertAmountToWords(value: any): string {
    if (value === null || value === undefined || isNaN(value)) return '';

    const num = parseFloat(value).toFixed(2);
    const [rupees, paise] = num.split('.');

    const rupeesInWords = this.convertToWords(parseInt(rupees)) + ' Rupees';
    const paiseInWords =
      parseInt(paise) > 0
        ? ` and ${this.convertToWords(parseInt(paise))} Paise`
        : '';

    return `${rupeesInWords}${paiseInWords} Only`;
  }

  private ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  private tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  private convertToWords(num: number): string {
    if (num === 0) return 'Zero';
    if (num < 20) {
      return this.ones[num];
    } else if (num < 100) {
      return (
        this.tens[Math.floor(num / 10)] +
        (num % 10 ? ' ' + this.ones[num % 10] : '')
      );
    } else if (num < 1000) {
      return (
        this.ones[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' and ' + this.convertToWords(num % 100) : '')
      );
    } else if (num < 100000) {
      return (
        this.convertToWords(Math.floor(num / 1000)) +
        ' Thousand' +
        (num % 1000 ? ' ' + this.convertToWords(num % 1000) : '')
      );
    } else if (num < 10000000) {
      return (
        this.convertToWords(Math.floor(num / 100000)) +
        ' Lakh' +
        (num % 100000 ? ' ' + this.convertToWords(num % 100000) : '')
      );
    } else {
      return (
        this.convertToWords(Math.floor(num / 10000000)) +
        ' Crore' +
        (num % 10000000 ? ' ' + this.convertToWords(num % 10000000) : '')
      );
    }
  }
}
