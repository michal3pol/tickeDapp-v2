import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace-comp/marketplace.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { ResellComponent } from './resell/resell.component';
import { SellComponent } from './sell/sell.component';
import { ConcertSectorsComponent } from './concert-sectors/concert-sectors.component';
import { SwiperModule } from "swiper/angular";
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    MarketplaceComponent,
    ResellComponent,
    SellComponent,
    ConcertSectorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    SwiperModule,
    FormsModule
  ]
})
export class MarketplaceModule { }