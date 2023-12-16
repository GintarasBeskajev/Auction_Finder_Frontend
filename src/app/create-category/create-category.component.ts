import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})

export class CreateCategoryComponent {
  name: any;
  isButtonDisabled: boolean = true;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private authService: AuthService ) {}

  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/Login']);
    }
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
    this.apiService.createCategory(data).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.router.navigate(['/Categories']);
    });
  }
}
