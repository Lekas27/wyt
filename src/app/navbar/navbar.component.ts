import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StrapiService } from '../strapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tokenExists: boolean = false;

  constructor(private router: Router, private strapiService: StrapiService) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem('token');
    this.tokenExists = !!token; // Convert token to boolean
  }

  logout() {
    localStorage.removeItem('token');
    this.checkToken();
    this.router.navigate(['/login']);
  }
}
