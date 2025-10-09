// urlhelpers.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlhelpersService {
  public getAPIURL(): string {
    return 'http://127.0.0.1:5000/api/v1';
    // return "https://fourdotz-backend.onrender.com/api/v1"
  }
}
