import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrl: './user-auctions.component.scss'
})

export class UserAuctionsComponent implements OnInit {
  auctions: any;
  categories: any;
  auctionsToShow: any[] = [];
  initialized: boolean = false;
  mySubscription: any;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    }

    // this.apiService.getCategories().subscribe((categories) => {
    //   this.categories = categories;

    //   if (this.categories != null) {
    //     this.categories.forEach((category: any) => {
    //       this.apiService.getAuctions(category.id).subscribe((auctions) => {
    //         this.auctions = auctions;

    //         if (this.auctions.length > 0) {
    //           this.auctions.forEach((auction: any) => {
    //             if(auction.userId == this.authService.getUserId()){
    //               this.auctionsToShow.push(auction);
    //             }
    //           });
    //         }
    //       });
    //     });
    //   }

    //   this.initialized = true;
    // });

    this.apiService.getUserAuctions().subscribe((auctions) => {
      this.auctionsToShow = auctions;
      this.initialized = true;
    });
  }

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
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
    this.modalService.openAuctionModal(auction.category.id, auction.id);
  }

  navigateToCreateAuction(): void {
    this.modalService.closeModal();
    this.modalService.openCreateAuctionModal();
  }
}
