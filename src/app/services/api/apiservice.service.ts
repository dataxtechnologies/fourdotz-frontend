import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlhelpersService } from '../auth/urlhelpers.service';
import { EnvurlService } from '../envurl.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor(
    private urlHelper: UrlhelpersService,
    private envUrl: EnvurlService,
    private router: Router // ✅ instance injected
  ) {}

  // Build headers (with token if available)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `${token}` }),
    });
  }

  private getHeadersforFormdata(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      ...(token && { Authorization: `${token}` }),
    });
  }

  // Login API
  public loginApi<T>(payload: any): Observable<T> {
    // ✅ Use the instance envUrl, not the class
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.loginApi}`;

    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error.error.success === false &&
            error.error.message == 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }
          //console.error('Login API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'Login API error',
            error,
          }));
        })
      );
  }

  public logoutApi<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.logoutApi}`;

    return this.http
      .post<T>(serviceURL, {}, { headers: this.getHeaders() }) // ✅ empty body, headers in 3rd arg
      .pipe(
        catchError((error) => {
          if (
            error.error.success === false &&
            error.error.message == 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }
          //console.error('Logout API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'Logout API error',
            error,
          }));
        })
      );
  }

  // create Association by superadmin

  public createAssociation<T>(payload: any): Observable<T> {
    // ✅ Use the instance envUrl, not the class
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.createAssociation
    }`;

    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error.error.success === false &&
            error.error.message == 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }
          //console.error('Login API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'Login API error',
            error,
          }));
        })
      );
  }

  // association list by SA

  public getAssociations<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AssociationList
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }

        //console.error('Get Associations API error', error.error.success);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public UpdateTempPass<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.UpdateTempPass
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public getAssociationbyId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.getAssociationbyId
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public UserInfo<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.UserInfo
    }?user_type=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public getpropertybyAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.getpropertybyAssociation
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public getUserData<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.getUserData
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public AssociationDataOnboard<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AssociationDataOnboard
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public AssociationDocumentOnboard<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AssociationDocumentOnboard
    }`;

    return this.http
      .post<T>(serviceURL, formData, {
        // ⚠️ DO NOT manually set Content-Type for FormData
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('AssociationDocumentOnboard API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'AssociationDocumentOnboard API error',
            error,
          }));
        })
      );
  }

  public propertiesbyAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.propertiesbyAssociation
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public PropertyListinAssociation<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.PropertyListinAssociation
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public AddPropertybyAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AddPropertybyAssociation
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public ViewpropertybyId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ViewpropertybyId
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public createownerinproperty<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.createownerinproperty
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public ownerproperties<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ownerproperties
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public Addpet<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.Addpet}`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public AddVehicle<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AddVehicle}`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public createTenantinproperty<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.createTenantinproperty
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public ListMaintenanceinAssociation<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ListMaintenanceinAssociation
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public MaintenanceListinOwner<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.MaintenanceListinOwner
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public Dashboarddata<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.Dashboarddata
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public generateMaintenanceInvoice<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.generateMaintenanceInvoice
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public RentalInvoicelistinowner<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RentalInvoicelistinowner
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public TenantListinOwner<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.TenantListinOwner
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public TenantMaintenanceList<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.TenantMaintenanceList
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public RentalInvoicegeninOwner<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RentalInvoicegeninOwner
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public TenantPropertyDatas<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.TenantPropertyDatas
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public TenantRentalInvoiceList<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.TenantRentalInvoiceList
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public SuperadminDashboardData<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.SuperadminDashboard
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public UpdatePropertyData<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.UpdatePropertyData
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public ResidentedProperty<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ResidentedProperty
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public RemoveOwnerResident<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RemoveOwnerResident
    }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public RemoveTenantResident<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RemoveTenantResident
    }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public EditTenantDetails<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.EditTenantDetails
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public UpdateAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.UpdateAssociation
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public AmountforAssociationinSA<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AmountforAssociation
    }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public AmountforAssociationinASS<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.maintenanceAmountBalance
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public SendRemainderforMaintenance<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.SendRemainderforMaintenance
    }?id=${payload}`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, '', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }
  public CreatePaymentforInvoiceId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.CreatePaymentforInvoiceId
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public RentalInvoice<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RentalInvoice
    }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public RentalinvoiceQR<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.RentalinvoiceQR
    }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public ChangeRentalInvoicePaidStatus<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ChangeRentalInvoicePaidStatus
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public forgetpassword<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.forgetpassword
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public updateforgetpassword<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.updateforgetpassword
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public CreateAnnouncement<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.CreateAnnouncement
    }`;

    return this.http
      .post<T>(serviceURL, formData, {
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('AssociationDocumentOnboard API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'AssociationDocumentOnboard API error',
            error,
          }));
        })
      );
  }

  public ListAnnouncementinHOA<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ListAnnouncementinHOA
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }


  public listpinannouncement<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.listpinannouncement
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }


  public ListAnnouncementinOwnerTenant<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.ListAnnouncementinOwnerTenant
    }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }

  public Createpinannouncement<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.pinannouncement
    }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }


  public OwnerUpdateUPI<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.OwnerUpdateUPI
    }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          //console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }


    public MaintenanceInvoicegetbyID<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.MaintenanceInvoicegetbyID
    }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        if (
          error.error.success === false &&
          error.error.message == 'Session expired'
        ) {
          this.router.navigate(['/auth/sign-in']);
        }
        //console.error('Get Associations API error', error);
        return throwError(() => ({
          statusCode: 500,
          message: 'Get Associations API error',
          error,
        }));
      })
    );
  }
}
