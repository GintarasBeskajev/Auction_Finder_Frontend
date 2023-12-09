import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuctionComponent } from './auction/auction.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { EditAuctionComponent } from './edit-auction/edit-auction.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openAuctionModal(categoryId: any, auctionId: any): void {
    const dialogRef = this.dialog.open(AuctionComponent, {
      width: '300px',
      height: '400px',
      data: { categoryId, auctionId },
    });
  }

  openAuctionGeneralModal(categoryId: any, auctionId: any): void {
    const dialogRef = this.dialog.open(AuctionComponent, {
      width: '300px',
      height: '350px',
      data: { categoryId, auctionId },
    });
  }

  openCreateAuctionModal(): void {
    const dialogRef = this.dialog.open(CreateAuctionComponent, {
      width: '400px',
      height: '570px',
    });
  }

  openEditAuctionModal(categoryId: any, auctionId: any): void {
    const dialogRef = this.dialog.open(EditAuctionComponent, {
      width: '300px',
      height: '470px',
      data: { categoryId, auctionId },
    });
  }

  openCategory(categoryId: any): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '300px',
      height: '150px',
      data: { categoryId },
    });
  }

  openCreateCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '300px',
      height: '160px',
    });
  }

  openEditCategory(categoryId: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '300px',
      height: '160px',
      data: { categoryId },
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
