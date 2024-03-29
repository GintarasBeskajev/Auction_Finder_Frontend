import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-edit-bid',
  templateUrl: './edit-bid.component.html',
  styleUrl: './edit-bid.component.scss'
})
export class EditBidComponent {
  comment: any;
  bid: any;
  isButtonDisabled: boolean = true;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }

    this.bid = this.data.bid;
    this.comment = this.bid.comment;

    if(this.bid.userId != this.authService.getUserId()){
      this.router.navigate(['/Login']);
    }

    this.updateButtonState();

    this.initialized = true;
  }

  updateButtonState() {
    if(this.comment != null && this.comment.length >= 2){
        this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    const data = { comment: this.comment };
    this.apiService.editBid(data, this.bid.categoryId, this.bid.auctionId, this.bid.id).subscribe(response => {
      this.modalService.closeModal();
      this.router.navigate([this.router.url]);
    });
  }
}
