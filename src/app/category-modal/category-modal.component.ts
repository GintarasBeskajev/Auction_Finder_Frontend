import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})

export class CategoryModalComponent {
  categoryId: any;
  category: any;
  authenticated: boolean = false;
  initialized: boolean = false;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService : AuthService,
              private modalService : ModalService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {

    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }else{
      this.router.navigate(['/Login']);
    }

    this.categoryId = this.data.categoryId;

    this.apiService.getCategory(this.categoryId).subscribe((data) => {
      this.category = data;
      this.initialized = true;
    });
  }

  onEditClick(){
    this.modalService.closeModal();
    this.modalService.openEditCategory(this.categoryId);
  }

  onDeleteClick(){
    this.apiService.deleteCategory(this.categoryId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.router.navigate(['/Categories']);
    });
  }
}
