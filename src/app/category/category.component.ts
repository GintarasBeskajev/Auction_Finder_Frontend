import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  auctions: any;
  auctionsToShow: any[] = [];
  categoryId: any;
  category: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');

  this.apiService.getAuctions(this.categoryId).subscribe((data) => {
    this.auctions = data;

    this.auctionsToShow = this.auctions
      .filter((auction: any) => !this.checkDate(this.transformDate(auction.endDate)));
  });

  this.apiService.getCategory(this.categoryId).subscribe((data) => {
    this.category = data.name.toLowerCase();
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

  navigateToAuction(auctionId:any): void {
    this.router.navigate(['/Auction', this.categoryId, auctionId]).then(() => {
      window.location.reload();
    });
  }
}
