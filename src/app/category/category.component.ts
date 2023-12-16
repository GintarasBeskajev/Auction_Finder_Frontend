import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit {
  auctions: any;
  auctionsToShow: any[] = [];
  categoryId: any;
  category: any;
  initialized: boolean = false;
  mySubscription: any;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    this.apiService.getAuctions(this.categoryId).subscribe((data) => {
      this.auctions = data;

      this.auctionsToShow = this.auctions.filter((auction: any) => !this.checkDate(this.transformDate(auction.endDate)));

      this.apiService.getCategory(this.categoryId).subscribe((data) => {
        this.category = data.name.toLowerCase();
        this.initialized = true;
      });
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  checkDate(dateString: string): boolean {
    const currentDate = new Date();
    const dateToCompare = new Date(dateString);
    return dateToCompare < currentDate;
  }

  navigateToAuction(auction:any): void {
    this.modalService.closeModal();
    if(auction.userId == this.authService.getUserId() || this.authService.isAdmin()){
      this.modalService.openAuctionModal(this.categoryId, auction.id);
    } else{
      this.modalService.openAuctionGeneralModal(this.categoryId, auction.id);
    }
  }
}
