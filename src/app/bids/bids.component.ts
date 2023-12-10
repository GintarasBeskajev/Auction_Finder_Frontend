import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.scss'
})

export class BidsComponent {
  bids: any;
  auction: any;
  categoryId: any;
  auctionId: any;
  yourAuction: boolean = false;
  isAuthenticated: boolean = false;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
    }

    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.auctionId = this.route.snapshot.paramMap.get('auctionId');

    this.apiService.getBids(this.categoryId, this.auctionId).subscribe((bids) => {
      this.bids = bids;

      this.apiService.getAuction(this.categoryId, this.auctionId).subscribe((auction) => {
        if(this.authService.getUserId() == auction.userId){
          this.yourAuction = true;
        }
        this.auction = auction;

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

  navigateToBid(bid:any): void {
    this.modalService.closeModal();
    if(bid.userId == this.authService.getUserId()){
      this.modalService.openBidModal(bid);
    }else{
      this.modalService.openGeneralBidModal(bid);
    }
  }

  navigateToCreateBid(): void {
    this.modalService.openCreateBidModal(this.auction);
  }
}
