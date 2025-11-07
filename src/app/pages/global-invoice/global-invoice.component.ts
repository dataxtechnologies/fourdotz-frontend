import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-global-invoice',
  imports: [CommonModule],
  templateUrl: './global-invoice.component.html',
  styleUrl: './global-invoice.component.css',
})
export class GlobalInvoiceComponent {
  isPaid: boolean = false; // ✅ Toggle this to show/hide watermark
  invoice_id: string | null = null; // ✅ Store the invoice_id from route
  invoiceItems: any;
  qrImage: any;

  invoiceData: any;

  totalVisibleRows = 11;

  constructor(
    private ActivatedParams: ActivatedRoute,
    private apiService: ApiserviceService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ActivatedParams.paramMap.subscribe((params) => {
      this.invoice_id = params.get('invoice_id');
      console.log('Invoice ID:', this.invoice_id);
    });

    this.RentalInvoice(this.invoice_id);
  }

  get fillerRows() {
    const emptyCount = this.totalVisibleRows - this.invoiceItems.length;
    return Array(emptyCount > 0 ? emptyCount : 0);
  }

  // get totalAmount() {
  //   return this.invoiceItems
  //     .reduce((sum, item) => sum + parseFloat(item.total.replace(/,/g, '')), 0)
  //     .toLocaleString();
  // }

  RentalInvoice(data: any) {
    this.apiService.RentalInvoice<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.invoiceData = res.data;
          this.invoiceItems = this.invoiceData.items;
          this.isPaid = this.invoiceData.payment_status;
          this.RentalinvoiceQR(this.invoiceData.invoice_no)
          // this.Toast.success(res.message);
        } else {
          //  this.Toast.warning(res.message);
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        //  this.Toast.error(err.err.error.message);
        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
  RentalinvoiceQR(data: any) {
    this.apiService.RentalinvoiceQR<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
           this.qrImage = 'data:image/png;base64,' + res.data.qr_code;
          // this.Toast.success(res.message);
        } else {
          //  this.Toast.warning(res.message);
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        //  this.Toast.error(err.err.error.message);
        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
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

  formatInvoiceTypeCaps(value: string): string {
    if (!value) return '';

    return value
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toUpperCase(); // Convert everything to uppercase
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
