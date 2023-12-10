import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.scss'
})
export class CreateAuctionComponent {
  name: any;
  description: any;
  endDate: any;
  startDate: any;
  categoryId: any;
  isButtonDisabled: boolean = true;
  categories: any;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService ) {}

  ngOnInit(): void {

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.name != null && this.description != null && this.endDate != null && this.categoryId != null &&
        this.name.length != 0 && this.description.length != 0 && this.endDate.length != 0 && this.categoryId.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    let endDateObject = new Date(this.endDate);
    endDateObject.setHours(endDateObject.getHours() - 2);
    this.endDate = this.datePipe.transform(endDateObject, 'yyyy-MM-ddTHH:mm:ss')!;

    let startDateObject = new Date();
    startDateObject.setHours(startDateObject.getHours() - 2);
    this.startDate = this.datePipe.transform(startDateObject, 'yyyy-MM-ddTHH:mm:ss')!;

    this.endDate = this.endDate + 'Z';
    this.startDate = this.startDate + 'Z';

    const data = { name: this.name, description: this.description, startDate: this.startDate, endDate: this.endDate };
    this.apiService.createAuction(data, this.categoryId).subscribe(response => {
      this.router.navigate(['/MyAuctions']).then(() => {
        window.location.reload();
      });
    });
  }
}
