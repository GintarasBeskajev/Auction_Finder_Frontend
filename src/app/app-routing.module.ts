import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuctionComponent } from './auction/auction.component';
import { UserAuctionsComponent } from './user-auctions/user-auctions.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { CategoriesComponent } from './categories/categories.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { BidsComponent } from './bids/bids.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'Category/:id', component: CategoryComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Profile', component: ProfileComponent },
  // { path: 'Auction/:id/:auctionId', component: AuctionComponent },
  { path: 'MyAuctions', component: UserAuctionsComponent },
  { path: 'MyBids', component: MyBidsComponent },
  { path: 'Bids/:categoryId/:auctionId', component: BidsComponent },
  // { path: 'CreateAuction', component: CreateAuctionComponent },
  { path: 'Categories', component: CategoriesComponent },
  // { path: 'Profile', component: ProfileComponent },
  { path: '**', redirectTo: '/Login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
