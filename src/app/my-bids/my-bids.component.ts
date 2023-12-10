import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrl: './my-bids.component.scss'
})

export class MyBidsComponent {
  auctions: any;
  categories: any;
  bids: any
  bidsToShow: any[] = [];
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    }

    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      if (this.categories != null) {
        this.categories.forEach((category: any) => {
          this.apiService.getAuctions(category.id).subscribe((auctions) => {
            this.auctions = auctions;
            if (this.auctions.length > 0) {
              this.auctions.forEach((auction: any) => {
                this.apiService.getBids(category.id, auction.id).subscribe((bids) => {
                  if(bids.length > 0 && bids != undefined){
                    bids.forEach((bid: any) => {
                      if(bid.userId == this.authService.getUserId()){
                        this.bidsToShow.push(bid);
                      }
                    });
                  }
                });
              });
            }
          });
          this.initialized = true;
        });
      }else{
        this.initialized = true;
      }
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  navigateToBid(bid:any): void {
    this.modalService.closeModal();
    this.modalService.openBidModal(bid);
  }
}
