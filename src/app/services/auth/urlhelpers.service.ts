// urlhelpers.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlhelpersService {
  public getAPIURL(): string {
    // return 'http://127.0.0.1:5000/api/v1';
    return "https://api.fourdotz.com/api/v1" // production
    // return "https://dev-api.fourdotz.com/api/v1" // development
    // return "https://fourdotz-backend.onrender.com/api/v1" //render development
  }
}
