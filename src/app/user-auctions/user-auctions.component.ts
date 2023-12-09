import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrl: './user-auctions.component.scss'
})

export class UserAuctionsComponent implements OnInit {

  auctions: any;
  categories: any;
  auctionsToShow: any[] = [];

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']).then(() => {
        window.location.reload();
      });
    }

    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;

      if (this.categories != null) {
        this.categories.forEach((category: any) => {
          this.apiService.getAuctions(category.id).subscribe((auctions) => {
            this.auctions = auctions;

            if (this.auctions.length > 0) {
              this.auctions.forEach((auction: any) => {
                if(auction.userId == this.authService.getUserId()){
                  this.auctionsToShow.push(auction);
                }
              });
            }
          });
        });
      }
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

  navigateToAuction(auction:any): void {
    this.router.navigate(['/Auction', auction.category.id, auction.id]).then(() => {
      window.location.reload();
    });
  }

  navigateToCreateAuction(): void {
    this.router.navigate(['/CreateAuction']);
  }
}
