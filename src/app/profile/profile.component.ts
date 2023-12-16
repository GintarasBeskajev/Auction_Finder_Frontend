import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  @Input() name: string = '';
  displayedColumns = ['id', 'creationDate'];
  dataSource: MatTableDataSource<any>;
  initialized: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.apiService.getUserBids().subscribe((response) => {

      console.log(response);

      // const modifiedResponse = response.map((item: any) => {
      //   const { userEmail, auction, creationDate, userId, comment, bidSize, ...newItem } = item;
      //   return newItem;
      // });

      // console.log(modifiedResponse)

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.initialized = true;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  navigateToBid(bid:any): void {
    this.modalService.closeModal();
    this.modalService.openBidModal(bid);
  }

  checkDate(dateString: string): string {
    const currentDate = new Date();
    const dateToCompare = new Date(dateString);
    if(dateToCompare < currentDate){
      return "Finished";
    }else{
      return "Ongoing";
    }
  }
}
