import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StrapiService } from '../strapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tokenExists: boolean = false;
  posts: any[] = []; // Array to hold posts
  isLoading: boolean = true; // Loading state

  constructor(private router: Router, private strapiService: StrapiService) {
    this.checkToken();
  }

  ngOnInit() {
    this.fetchPosts();
  }

  checkToken() {
    const token = localStorage.getItem('token');
    this.tokenExists = !!token; // Sets tokenExists to true if token exists
  }

  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page or homepage
    this.router.navigate(['/login']); // Adjust this route as necessary

    // Optionally, refresh the tokenExists status
    this.checkToken();
  }

  // Method to fetch posts
  fetchPosts() {
    this.strapiService.getPosts().subscribe(
      (response) => {
        // Access the posts from the response.data array
        this.posts = response.data; // Assuming the response structure you provided
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.isLoading = false;
      }
    );
  }
}
