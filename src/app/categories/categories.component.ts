import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
  categories: any[] = [];
  initialized: boolean = false;
  mySubscription: any;
  displayedColumns: string[] = ['name'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

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

    this.apiService.getCategories().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource(response);
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
