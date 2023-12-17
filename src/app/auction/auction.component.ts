import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss'
})

export class AuctionComponent {
  auction : any;
  auctionId: any;
  categoryId: any;
  category: any;
  authenticated: boolean = false;
  yourAuction: boolean = false;
  initialized: boolean = false;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService : AuthService,
              private modalService : ModalService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authenticated = true;
    }

    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }

    this.categoryId = this.data.categoryId;
    this.auctionId = this.data.auctionId;

    this.apiService.getAuction(this.categoryId, this.auctionId).subscribe((data) => {
      this.auction = data;

      if(this.authService.getUserId() == this.auction.userId){
        this.yourAuction = true;
      }

      this.initialized = true;
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  checkOwnership(): boolean{
    if(this.auction.userId == this.authService.getUserId()){
      return true;
    }

    return false;
  }

  onEditClick(){
    this.modalService.closeModal();
    this.modalService.openEditAuctionModal(this.categoryId, this.auctionId);
  }

  onDeleteClick(){
    this.apiService.deleteAuction(this.categoryId, this.auctionId).subscribe(response => {
      this.modalService.closeModal();
      this.router.navigate([this.router.url]);
    });
  }

  navigateToBids(): void {
    this.modalService.closeModal();
    this.router.navigate(['/Bids', this.auction.category.id, this.auction.id]);
  }
}
