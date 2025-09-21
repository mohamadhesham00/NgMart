import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;
  submitted = false;
  loginError = '';

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    if (username && password) {
      let result = await this._authService.login({ username, password });
      if (!result.success) {
        this.loginError = 'Invalid username or password';
      } else {
        alert('Login successful!');
        this.loginForm.reset();
        this.router.navigateByUrl('/home');
      }
    }
  }
}
