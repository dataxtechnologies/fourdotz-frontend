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
    const token = sessionStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
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
          console.error('Login API error', error);
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
          console.error('Logout API error', error);
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
          console.error('Login API error', error);
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

        console.error('Get Associations API error', error.error.success);
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

          console.error('UpdateTempPass API error', error);
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
        console.error('Get Associations API error', error);
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
        console.error('Get Associations API error', error);
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
        console.error('Get Associations API error', error);
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

          console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }

  public AssociationDocumentOnboard<T>(payload: FormData): Observable<T> {
    const serviceURL = `${this.urlHelper.getAPIURL()}${
      this.envUrl.AssociationDocumentOnboard
    }`;

    return this.http
      .post<T>(serviceURL, payload, {
        headers: this.getHeaders(), // pass true for FormData
      })
      .pipe(
        catchError((error) => {
          if (
            error?.error?.success === false &&
            error?.error?.message === 'Session expired'
          ) {
            this.router.navigate(['/auth/sign-in']);
          }

          console.error('AssociationDocumentOnboard API error', error);
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
        console.error('Get Associations API error', error);
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

          console.error('UpdateTempPass API error', error);
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
        console.error('Get Associations API error', error);
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

          console.error('UpdateTempPass API error', error);
          return throwError(() => ({
            statusCode: 500,
            message: 'UpdateTempPass API error',
            error,
          }));
        })
      );
  }
}
