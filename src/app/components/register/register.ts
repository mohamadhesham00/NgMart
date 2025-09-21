import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  signupForm!: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  submitted = false;
  signupError = '';
  signupSuccess = false;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          nonNullable: true,
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  // ✅ Custom validator to check password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.signupError = '';
    this.signupSuccess = false;

    if (this.signupForm.invalid) {
      return;
    }

    const { username, email, password } = this.signupForm.value;
    try {
      if (username && email && password) {
        let user = { username, email, password };
        const result = await this._authService.signUp(user);
        if (result.success) {
          this.signupSuccess = true;
          alert('Signup successful! You are now logged in.');
          this.signupForm.reset();
          this.submitted = false;
          this.router.navigateByUrl('/home');
        } else {
          this.signupError = result.message || 'Signup failed. Please try again.';
        }
      } else {
        this.signupError = 'Invalid Data';
      }
    } catch (error: any) {
      console.error(error);
      this.signupError = error?.message || 'An error occurred during signup.';
    }
  }
}
