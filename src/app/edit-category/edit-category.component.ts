import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})

export class EditCategoryComponent {
  name: any;
  categoryId: any;
  category:any
  isButtonDisabled: boolean = true;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/Login']);
    }

    this.categoryId = this.data.categoryId;

    this.apiService.getCategory(this.categoryId).subscribe((data) => {
      this.category = data;
      this.name = this.category.name;
      this.updateButtonState();
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.name != null && this.name.length != 0){
        this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    const data = { name: this.name };
    this.apiService.editCategory(data, this.categoryId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.router.navigate(['/Categories']);
      this.modalService.closeModal();
    });
  }
}
