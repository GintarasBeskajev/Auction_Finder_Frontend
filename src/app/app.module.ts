import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuctionComponent } from './auction/auction.component';
import { UserAuctionsComponent } from './user-auctions/user-auctions.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { EditAuctionComponent } from './edit-auction/edit-auction.component';
import { BidsComponent } from './bids/bids.component';
import { BidComponent } from './bid/bid.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AuctionComponent,
    UserAuctionsComponent,
    CreateAuctionComponent,
    EditAuctionComponent,
    BidsComponent,
    BidComponent,
    CategoriesComponent,
    EditBidComponent,
    CreateBidComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryModalComponent,
    MainPageComponent,
    MyBidsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatSnackBarModule,
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
