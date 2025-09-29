import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  passwordFieldType: string = 'password'; // default type

  constructor(private route : Router){}

  togglePassword() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  login(){
    this.route.navigateByUrl('Superadmin/Dashboard')
  }

}
