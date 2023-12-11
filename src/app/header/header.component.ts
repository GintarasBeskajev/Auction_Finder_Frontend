import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  categories : any;
  selectedOption: string = '';
  authenticated: boolean = false;
  initialized: boolean = false;
  isMenuOpen = false;
  mySubscription: any;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authenticated = true;
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
      this.initialized = true;
    });
  }

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  navigateToCategory(category:any): void {
    this.router.navigate(['/Category', category.id]);
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
