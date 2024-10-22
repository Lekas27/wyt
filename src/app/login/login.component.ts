import { Component } from '@angular/core';
import { StrapiService } from '../strapi.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private strapiService: StrapiService, private router: Router) {}

  onLogin(form: any) {
    const { identifier, password } = form.value;

    this.strapiService.login(identifier, password).subscribe({
      next: (response) => {
        // Save the token in local storage or a service
        localStorage.setItem('token', response.jwt);

        // Redirect to a protected route or homepage
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials, please try again';
      }
    });
  }
}
