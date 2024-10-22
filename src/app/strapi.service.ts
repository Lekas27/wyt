import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private baseUrl: string = 'http://localhost:1337/api'; // Adjust your Strapi API URL

  constructor(private http: HttpClient) {}

  // Register user using Strapi's built-in register endpoint
  registerUser(username: string, email: string, password: string): Observable<any> {
    const registerData = {
      username: username,
      email: email,
      password: password
    };
    return this.http.post(`${this.baseUrl}/auth/local/register`, registerData);
  }
  login(identifier: string, password: string): Observable<any> {
    const loginData = {
      identifier: identifier,
      password: password
    };

    return this.http.post<any>(`${this.baseUrl}/auth/local`, loginData);
  }
  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts?populate=*`); // Adjust the endpoint as necessary
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`); // Assuming your API endpoint is structured like this
  }
  createPost(postData: FormData) {
    return this.http.post(`${this.baseUrl}/posts`, postData);
  }
}
