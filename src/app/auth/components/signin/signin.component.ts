import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  email: string = '';
  password: string = '';
  isLoggingIn = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService
      .signIn({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['staffing-up']),
        error: (error) => {
          this.isLoggingIn = false;
          alert(error.message);
        },
      });
  }

  register() {
    this.isLoggingIn = true;

    this.authenticationService
      .register({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['home']),
        error: (error) => {
          alert(error.message);
        },
      });
  }

  logout() {
    this.authenticationService.logout();
  }
}
