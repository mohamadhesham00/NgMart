import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../register/register';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, Register, Login],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin: boolean = true;
  toggle() {
    this.isLogin = !this.isLogin;
  }
}
