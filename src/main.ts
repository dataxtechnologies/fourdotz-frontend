import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,

      // 🔥 THIS FIXES THE ERROR
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        preventDuplicates: true,
        closeButton: true,
      })
    ),
  ],
}).catch(err => console.error(err));
