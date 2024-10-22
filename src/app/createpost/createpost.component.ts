import { Component } from '@angular/core';
import { StrapiService } from '../strapi.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Import the correct method for decoding JWT
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'] // Corrected styleUrls to plural
})
export class CreatepostComponent {
  postForm: FormGroup;
  userId: string | null = null;  // Store the decoded user ID

  constructor(private fb: FormBuilder, private strapiService: StrapiService) {
    this.postForm = this.fb.group({
      article: [''],
      userId: [''],  // We'll set this dynamically
      image: [null]
    });

    // Call a method to decode the token and set the userId
    this.setUserIdFromToken();
  }

  setUserIdFromToken() {
    const token = localStorage.getItem('auth_token');  // Assuming the token is stored in localStorage
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.id || decodedToken.userId;  // Get userId from decoded token

      // Set the userId in the form
      this.postForm.patchValue({ userId: this.userId });
    }
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; // Get the first selected file
    if (file) {
      this.postForm.patchValue({
        image: file // Update the form control with the selected file
      });
    }
  }

  submitPost() {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('article', this.postForm.get('article')?.value);
      
      // Decode the token to get the user ID
      const token = localStorage.getItem('auth_token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id || decodedToken.userId; // Adjust based on your token structure
  
        // Append userId for the relation in the post
        formData.append('userId', userId); // Use the decoded userId
      }
  
      formData.append('image', this.postForm.get('image')?.value);
  
      // Call Strapi service to submit the post
      this.strapiService.createPost(formData).subscribe(response => {
        console.log('Post created successfully:', response);
      }, error => {
        console.error('Error creating post:', error);
      });
    }
  }
  
}
