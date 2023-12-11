import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrl: './edit-auction.component.scss'
})

export class EditAuctionComponent {
  name: any;
  description: any;
  endDate: any;
  startDate: any;
  categoryId: any;
  auctionId: any;
  auction:any
  isButtonDisabled: boolean = true;
  isAdmin: boolean = false;
  yourAuction: boolean = false;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }

    this.categoryId = this.data.categoryId;
    this.auctionId = this.data.auctionId;

    this.apiService.getAuction(this.categoryId, this.auctionId).subscribe((data) => {
      this.auction = data;

      if(this.authService.getUserId() == this.auction.userId || this.isAdmin){
        this.yourAuction = true;
        this.name = this.auction.name;
        this.endDate = this.transformDate(this.auction.endDate);
        this.description = this.auction.description;
      }

      if(!this.yourAuction && !this.isAdmin){
        this.router.navigate(['/MyAuctions']);
      }

      this.updateButtonState();

      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.name != null && this.description != null && this.endDate != null && this.name.length != 0 &&
       this.description.length >= 2 && this.endDate.length != 0){
        this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }

    //console.log(this.endDate);
  }

  onPress(){
    let endDateObject = new Date(this.endDate);
    endDateObject.setHours(endDateObject.getHours() - 2);
    this.endDate = this.datePipe.transform(endDateObject, 'yyyy-MM-ddTHH:mm:ss')!;

    this.endDate = this.endDate + 'Z';

    const data = { name: this.name, description: this.description, endDate: this.endDate };
    this.apiService.editAuction(data, this.categoryId, this.auctionId).subscribe(response => {
      this.router.navigate(['/MyAuctions']).then(() => {
        window.location.reload();
      });
    });
  }

  transformDate(dateString: string): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }
}
