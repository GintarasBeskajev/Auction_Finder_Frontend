import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  mySubscription: any;
  displayedColumns: string[] = ['auction', 'status', 'creationDate', 'bidSize'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    if(sort != undefined){
      this.dataSource.sort = sort;
    }
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    }

    this.apiService.getUserBids().subscribe((response) => {
      this.bidsToShow = response;

      response = response.map((item : any) => ({
        ...item,
        creationDate: new Date(item.creationDate),
        status: this.checkDate(item.auction.endDate),
        auctionId: item.auction.id,
        categoryId: item.auction.category.id,
        auction: item.auction.name
      }));

      // console.log(response);
      this.dataSource = new MatTableDataSource(response);
      // console.log(this.dataSource);
      this.initialized = true;
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

  checkDate(auctionDate: string): string {
    const auctionDateToCompare = new Date(auctionDate);
    const dateToCompare = new Date();
    if(dateToCompare > auctionDateToCompare){
      return "Finished";
    }else{
      return "Ongoing";
    }
  }
}

