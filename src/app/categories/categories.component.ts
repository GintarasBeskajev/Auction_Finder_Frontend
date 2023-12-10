import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
  categories: any;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private authService: AuthService) {}

  ngOnInit(): void {
    if(!this.authService.isAdmin() && this.authService.isAuthenticated()){
      this.router.navigate(['/MyAuctions']);
    }else if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
      this.initialized = true;
    });
  }

  navigateToCategory(category:any): void {
    this.modalService.closeModal();
    this.modalService.openCategory(category.id);
  }

  navigateToCreateCategory(): void {
    this.modalService.closeModal();
    this.modalService.openCreateCategory();
  }
}
