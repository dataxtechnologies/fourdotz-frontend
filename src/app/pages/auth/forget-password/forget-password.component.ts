import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  
  constructor(private route:Router){}

  login(){
    this.route.navigateByUrl('auth/Change-passsword')
  }

}
