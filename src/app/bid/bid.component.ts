import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { ModalService } from '../modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.scss'
})

export class BidComponent {
  bid: any;
  authenticated: boolean = false;
  yourBid: boolean = false;
  initialized: boolean = false;

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

    this.bid = this.data.bid;

    if(this.bid.userId == this.authService.getUserId()){
      this.yourBid = true;
    }

    this.initialized = true;
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  onEditClick(){
    this.modalService.closeModal();
    this.modalService.openEditBidModal(this.bid);
  }

  onDeleteClick(){
    this.apiService.deleteBid(this.bid.auction.category.id, this.bid.auction.id, this.bid.id).subscribe(response => {
      this.router.navigate(['/MyBids']).then(() => {
        window.location.reload();
      });
    });
  }
}
