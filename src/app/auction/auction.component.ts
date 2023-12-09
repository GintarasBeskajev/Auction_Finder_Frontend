import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss'
})
export class AuctionComponent {
  auction : any;
  auctionId: any;
  categoryId: any;
  category: any;
  authenticated: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService : AuthService ) {}

  ngOnInit(): void {

    if(this.authService.isAuthenticated()){
      this.authenticated = true;
      console.log(this.authService.getUserId());
    }

    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.auctionId = this.route.snapshot.paramMap.get('auctionId');

    this.apiService.getAuction(this.categoryId, this.auctionId).subscribe((data) => {
      this.auction = data;
      console.log(this.auction);
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  checkDate(dateString: string): boolean {
    const currentDate = new Date();
    const dateToCompare = new Date(dateString);
    return dateToCompare < currentDate;
  }
}
