import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit {
  auctionsToShow: any[] = [];
  categoryId: any;
  initialized: boolean = false;
  mySubscription: any;
  displayedColumns: string[] = ['name', 'startDate', 'endDate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    this.apiService.getAuctions(this.categoryId).subscribe((response) => {
      response = response.map((item : any) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate)
      }));

      response = response.filter((item: any) => this.checkDate(item.endDate));

      this.auctionsToShow = response;
      this.dataSource = new MatTableDataSource(response);
      this.initialized = true;
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  checkDate(dateString: string): boolean {
    const currentDate = new Date();
    const dateToCompare = new Date(dateString);
    return dateToCompare > currentDate;
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
