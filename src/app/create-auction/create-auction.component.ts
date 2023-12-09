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

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService ) {}

  ngOnInit(): void {

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']).then(() => {
        window.location.reload();
      });
    }

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  updateButtonState() {
    if(this.name != null && this.description != null && this.endDate != null && this.categoryId != null){
      this.isButtonDisabled = false;
    }
  }

  onPress(){
    this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm:ss')!;
    this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss')!;

    this.endDate = this.endDate + 'Z';
    this.startDate = this.startDate + 'Z';

    console.log(this.endDate);
    console.log(this.startDate);

    console.log(this.categoryId);

    const data = { name: this.name, description: this.description, startDate: this.startDate, endDate: this.endDate };
    this.apiService.createAuction(data, this.categoryId).subscribe(response => {
      this.router.navigate(['/MyAuctions']);
    });
  }
}
