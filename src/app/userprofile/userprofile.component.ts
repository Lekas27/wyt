import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { jwtDecode } from 'jwt-decode';
import { StrapiService } from '../strapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  tokenExists = false;
  userData: any = {
    username: '',
    email: ''
  };

  constructor(private router: Router,private StrapiService: StrapiService) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem('token'); // Assuming you store your JWT in local storage
    if (token) {
      this.tokenExists = true;
      this.getUserDataFromToken(token);
    } else {
      this.tokenExists = false;
    }
  }

  getUserDataFromToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token); // Decode the token
      console.log('Decoded Token:', decodedToken); // Log the decoded token for inspection

      const userId = decodedToken.id; // Extract user ID from the token
      this.fetchUserData(userId); // Fetch user data using the ID
    } catch (error) {
      console.error('Error decoding token:', error);
      this.tokenExists = false;
    }
  }

  fetchUserData(userId: number) {
    this.StrapiService.getUserById(userId).subscribe({
      next: (user) => {
        this.userData.username = user.username || 'Unknown';
        this.userData.email = user.email || 'Unknown';
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.tokenExists = false; // Optionally handle token expiration or invalid state
      }
    });
  }
  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page or homepage
    this.router.navigate(['/']); // Adjust this route as necessary

    // Optionally, refresh the tokenExists status
    this.checkToken();
  }

}

