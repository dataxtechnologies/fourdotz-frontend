import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  imports: [],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {
  passwordFieldType: string = 'password'; // default type

  constructor(private route : Router){}

  togglePassword() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  login(){
    this.route.navigateByUrl('Superadmin/Dashboard')
  }

  forgetpassscreen(){
    this.route.navigateByUrl('auth/forget-password')
  }
}
