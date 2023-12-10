import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  categories : any;
  selectedOption: string = '';
  authenticated: boolean = false;
  initialized: boolean = false;
  isMenuOpen = false;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authenticated = true;
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
      this.initialized = true;
    });
  }

  navigateToCategory(category:any): void {
    this.router.navigate(['/Category', category.id]).then(() => {
      window.location.reload();
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/Login']);
  }

  navigateToMyBids(): void {
    this.router.navigate(['/MyBids']);
  }

  navigateToMyAuctions(): void {
    this.router.navigate(['/MyAuctions']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/Login']).then(() => {
      window.location.reload();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
