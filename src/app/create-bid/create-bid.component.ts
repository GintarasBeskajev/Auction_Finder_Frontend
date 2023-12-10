import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrl: './create-bid.component.scss'
})

export class CreateBidComponent {
  bidSize: any;
  comment: any;
  creationDate: any;
  auction: any;
  isButtonDisabled: boolean = true;
  initialized: boolean = false;
  maxPrice: number = 0;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private modalService:ModalService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }

    this.auction = this.data.auction;

    this.apiService.getBids(this.auction.category.id, this.auction.id).subscribe((bids) => {
      if(bids.length > 0){
        bids.forEach((bid: any) => {
          if(bid.bidSize>this.maxPrice){
            this.maxPrice = bid.bidSize;
          }
        });
      }
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.bidSize != null && this.comment != null && this.bidSize.length != 0 && this.comment.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    let dateObject = new Date();
    dateObject.setHours(dateObject.getHours() - 2);
    this.creationDate = this.datePipe.transform(dateObject, 'yyyy-MM-ddTHH:mm:ss')!;

    this.creationDate = this.creationDate + 'Z';

    if(this.maxPrice < this.bidSize){
      const data = { bidSize: this.bidSize, comment: this.comment, creationDate: this.creationDate };
      this.apiService.createBid(data, this.auction.category.id, this.auction.id).subscribe(response => {
        this.router.navigate(['/MyBids']).then(() => {
          window.location.reload();
        });
      });
    } else{
      this.snackBar.open("Your bid is too small", "Close", {
        duration: 2000,
      });
    }

    this.modalService.closeModal();
  }
}
