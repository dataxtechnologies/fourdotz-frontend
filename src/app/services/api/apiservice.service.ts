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
  ) { }

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
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.createAssociation
      }`;

    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AssociationList
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UpdateTempPass
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getAssociationbyId
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UserInfo
      }?user_type=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }

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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getpropertybyAssociation
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getUserData
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AssociationDataOnboard
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AssociationDocumentOnboard
      }`;

    return this.http
      .post<T>(serviceURL, formData, {
        // ⚠️ DO NOT manually set Content-Type for FormData
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.propertiesbyAssociation
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.PropertyListinAssociation
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AddPropertybyAssociation
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ViewpropertybyId
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.createownerinproperty
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ownerproperties
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public ownerpropertiesbyhoaId<T>(payload : any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ownerpropertiesbyhoaId
      }?created_by=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.createTenantinproperty
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListMaintenanceinAssociation
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.MaintenanceListinOwner
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.Dashboarddata
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.generateMaintenanceInvoice
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RentalInvoicelistinowner
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.TenantListinOwner
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.TenantMaintenanceList
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RentalInvoicegeninOwner
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.TenantPropertyDatas
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.TenantRentalInvoiceList
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SuperadminDashboard
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UpdatePropertyData
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ResidentedProperty
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RemoveOwnerResident
      }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RemoveTenantResident
      }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.EditTenantDetails
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UpdateAssociation
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AmountforAssociation
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.maintenanceAmountBalance
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SendRemainderforMaintenance
      }?id=${payload}`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, '', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreatePaymentforInvoiceId
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RentalInvoice
      }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RentalinvoiceQR
      }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ChangeRentalInvoicePaidStatus
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.forgetpassword
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.updateforgetpassword
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateAnnouncement
      }`;

    return this.http
      .post<T>(serviceURL, formData, {
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAnnouncementinHOA
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listpinannouncement
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAnnouncementinOwnerTenant
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.pinannouncement
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.OwnerUpdateUPI
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeadersforFormdata() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.MaintenanceInvoicegetbyID
      }?invoice_no=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CreateRequestUser<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateRequestUser
      }`;

    return this.http
      .post<T>(serviceURL, formData, {
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListRequestUser<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListRequestUser
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public ListRequestUserbyid<T>(payload : any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListRequestUser
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CommentsAddforRequest<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CommentsAddforRequest
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public listcommentsforrequest<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listcommentsforrequest
      }?request_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CreateServiceAdmin<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateServiceAdmin
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListServiceAdmin<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListServiceAdmin
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public ListAllRequestinAssociation<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAllRequestinAssociation
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public ListAllRequestinAssociationbyReqId<T>(payload :any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAllRequestinAssociation
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public ListAllrequestinServiceAdmin<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAllrequestinServiceAdmin
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public ListAllrequestinServiceAdminbyId<T>(payload : any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAllrequestinServiceAdmin
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public StartWorkonRequest<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.StartWorkonRequest
      }?id=${payload}`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public CompleteWorkonRequest<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CompleteWorkonRequest
      }?id=${payload}`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public UpdateOwnerDetails<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UpdateOwnerDetails
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public RemovePet<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RemovePet
      }?property_id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public RemoveVehicle<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.RemoveVehicle
      }?property_id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public GetAssociationQR<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetAssociationQR
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public SaveQRcodeAssociation<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SaveQRcodeAssociation
      }`;

    return this.http
      .post<T>(serviceURL, formData, {
        // ⚠️ DO NOT manually set Content-Type for FormData
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListpropertybasedonAssociationIdtoVisitors<T>(
    payload: any
  ): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListpropertybasedonAssociationIdtoVisitors
      }?association_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CreateVisitorEntry<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateVisitorEntry
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListAllVisitors<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAllVisitors
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public ListVisitorinGateKeeper<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListVisitorinGateKeeper
      }?type_of_visit=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public OwnerLoginPreVisitor<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.OwnerLoginPreVisitor
      }?type_of_visit=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public SendOTPtoMobile<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SendOTPtoMobile
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public sendMobileOTPonOnboard<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.sendMobileOTPonOnboard
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public verifyOtp<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.MobileVerifyonOnboard
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public VerifyOTPtoMObile<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.verify_otp}`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public GateKeeperCreate<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GateKeeperCreate
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public CreateGate<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateGate}`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public listGate<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listGate}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public listGateKeeper<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listGateKeeper
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public Listgatekeeper<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.Listgatekeeper
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public AssignGateKeeper<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AssignGateKeeper
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public UnassignGateKeeper<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UnassignGateKeeper
      }?gatekeeper_id=${payload}`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, '', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public GetPropertyData<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetPropertyData
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public AddSpotVisitorinGateKeeper<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AddSpotVisitorinGateKeeper
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public VisitorExit<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.VisitorExit
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ExitQRVisitor<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ExitQRVisitor
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListAgreementTemplates<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAgreementTemplates
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CreateAgreementTemplates<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateAgreementTemplates
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListCreatedAgreements<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListCreatedAgreements
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public listagreementTemplatesbyID<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listagreementTemplatesbyID
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public listAgreementbyId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.listAgreementbyId
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public ViewCreatedAgreementbyId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ViewCreatedAgreementbyId
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public CreateAgreementtosign<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateAgreementtosign
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public SendOTPforVerifySign<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SendOTPforVerifySign
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, {}, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public VerifyOTPforSign<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.VerifyOTPforSign
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public signAgreement<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.signAgreement
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public SendAgreement<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SendAgreement
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public ListAgreementforusers<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListAgreementforusers
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public OwnerListTemplatebyAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.OwnerListTemplatebyAssociation
      }?hoa_admin_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public UpdateUPI<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UpdateUPI
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public SendmailAgain<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SendmailAgain
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public AddTourdatas<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AddTourdatas
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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



  public getTourdatas<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getTourdatas
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public getallResourcesinAssociation<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getallResourcesinAssociation
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public getallResourcesinAssociationbyID<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getallResourcesinAssociationbyID
      }?created_by=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public CreateResourcesinAssociation<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateResourcesinAssociation
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public SetSlotRulesCreate<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.SetSlotRulesCreate
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public getResourcebyId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getResourcebyId
      }?resource_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public GetSlotRuleforResourcesId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetSlotRuleforResourcesId
      }?resource_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public GetTimeSlotsByResourceId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetTimeSlotsByResourceId
      }?resource_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public GetBookingforResourcesbyId<T>(payload: any, hoa_id: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetBookingforResourcesbyId
      }?resource_id=${payload}&hoa_admin_id=${hoa_id}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public GetBookingforAssociation<T>(hoa_id: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetBookingforResourcesbyId
      }?hoa_admin_id=${hoa_id}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public OpenthebookingslotToday<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.BookingSlotTodayinAssociation
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public GetBookinginOwner<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetBookinginOwner
      }?user_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public getallresourcesforOwner<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getallResourcesinAssociation
      }?created_by=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public BookResourceinOwner<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.BookResourceinOwner
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public BookingdetailsbyBookingId<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.BookingdetailsbyBookingId
      }?booking_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public CreateanAdSpace<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.CreateanAdSpace
      }`;

    return this.http
      .post<T>(serviceURL, formData, {
        // ⚠️ DO NOT manually set Content-Type for FormData
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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

  public getalladspace<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getalladspace
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public getadspacebyid<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getadspacebyid
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public VisitorAcceptoption<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.VisitorAcceptoption
      }`;

    // Use POST if sending payload
    return this.http
      .put<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public DeleteAnnouncementinHOA<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.DeleteAnnouncement
      }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public ListPropertyNotresidentedbyTenantinOwner<T>(): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ListPropertyNotresidentedbyTenantinOwner
      }`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public getpropertydatabyid<T>(data: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getpropertydatabyid
      }?id=${data}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public GetAssociationQRforvisitor<T>(data: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.GetAssociationQRforvisitor
      }?association_id=${data}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public getGatelistinQrformExternal<T>(
    payload: any
  ): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getGatelistinQrformExternal
      }?hoa_admin_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public UploadProfileImage<T>(formData: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.UploadProfileImage
      }`;

    return this.http
      .put<T>(serviceURL, formData, {
        // ⚠️ DO NOT manually set Content-Type for FormData
        headers: this.getHeadersforFormdata(), // <-- modify this method to skip JSON headers when true
      })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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


  public DeleteAdSpace<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.deleteadspace
      }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public DeleteGate<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.DeleteGate
      }?id=${payload}`;

    return this.http.delete<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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

  public gatekeeperQRshow<T>(
    payload: any
  ): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.gatekeeperQRshow
      }?hoa_admin_id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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
  public getrequestedresidentdetails<T>(
    payload: any
  ): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.getrequestedresidentdetails
      }?id=${payload}`;

    return this.http.get<T>(serviceURL, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        // 🔥 1. Handle 403 Unauthorized -> logout & redirect
        if (error.status === 403) {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/auth/sign-in']);
        }
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


  public AllowVisitor<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.AllowVisitor
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
  public ResendVisitorRequest<T>(payload: any): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${this.envUrl.ResendVisitorRequest
      }`;

    // Use POST if sending payload
    return this.http
      .post<T>(serviceURL, payload, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          // 🔥 1. Handle 403 Unauthorized -> logout & redirect
          if (error.status === 403) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
          }
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
}
