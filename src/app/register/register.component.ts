import { Component } from '@angular/core';
import { StrapiService } from '../strapi.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private strapiService: StrapiService, private router: Router) {}

  // Handle form submission
  onRegister(): void {
    this.strapiService.registerUser(this.username, this.email, this.password).subscribe({
      next: (response) => {
        // Handle successful registration, redirect to login or dashboard
        this.router.navigate(['/login']); // Adjust this to your preference
      },
      error: (error) => {
        // Handle registration error
        this.errorMessage = error.error.message || 'Registration failed, please try again.';
      }
    });
  }
}
