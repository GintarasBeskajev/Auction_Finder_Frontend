import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { UpdateService } from '../update.service';
import { Subscription } from 'rxjs';

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
  isAdmin = false;
  mySubscription: any;
  private subscription: Subscription;
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private el: ElementRef, private updateService: UpdateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         this.router.navigated = false;
      }
    });

    this.subscription = this.updateService.headerUpdate$.subscribe(() => {
      this.initialized = false;
      if(this.authService.isAdmin()){
        this.isAdmin = true;
      }

      if(this.authService.isAuthenticated()){
        this.authenticated = true;
      }

      this.apiService.getCategories().subscribe((data) => {
        this.categories = data;
        this.initialized = true;
      });
    });
  }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }

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
    this.subscription.unsubscribe();
  }

  navigateToCategory(category:any): void {
    this.router.navigate(['/Category', category.id]);
  }

  navigateToCategories(): void {
    this.router.navigate(['/Categories']);
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
    this.authService.logout().subscribe((response) => {

      if (this.isLocalStorageSupported()) {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
      }

      this.initialized = false;
      this.isAdmin = false;
      this.authenticated = false;

      this.apiService.getCategories().subscribe((data) => {
        this.categories = data;
        this.router.navigate(['/Login']);
        this.initialized = true;
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  private isLocalStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
