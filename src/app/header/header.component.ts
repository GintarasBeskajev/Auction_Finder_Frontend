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

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

    if(this.authService.isAuthenticated()){
      this.authenticated = true;
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
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

  navigateToProfile(): void {
    this.router.navigate(['/Profile']);
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
}
