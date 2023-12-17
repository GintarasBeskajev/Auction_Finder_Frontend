import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  displayedColumns: string[] = ['name', 'status', 'endDate', 'startDate', 'category'];
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

    this.apiService.getUserAuctions().subscribe((response) => {
      this.auctionsToShow = response;

      response = response.map((item : any) => ({
        ...item,
        startDate: new Date(item.startDate),
        status: this.checkDate(item.endDate),
        endDate: new Date(item.endDate),
        categoryId: item.category.id,
        category: item.category.name
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

  checkDate(auctionDate: string): string {
    const auctionDateToCompare = new Date(auctionDate);
    const dateToCompare = new Date();
    if(dateToCompare > auctionDateToCompare){
      return "Finished";
    }else{
      return "Ongoing";
    }
  }

  navigateToAuction(auction:any): void {
    this.modalService.closeModal();
    this.modalService.openAuctionModal(auction.categoryId, auction.id);
  }

  navigateToCreateAuction(): void {
    this.modalService.closeModal();
    this.modalService.openCreateAuctionModal();
  }
}
