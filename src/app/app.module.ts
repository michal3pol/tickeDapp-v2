import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component'
import { WalletService } from './services/wallet.service';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule} from '@angular/forms';
import { ConcertManagementModule } from './components/concert-management/concert-management.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MarketplaceModule } from './components/marketplace/marketplace.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from './components/user/user.module';
import { BlockchainSelectorModule } from './components/blockchain-selector/blockchain-selector.module';
import { AdminModule } from './components/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule, 
    ReactiveFormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    // custom
    ConcertManagementModule,
    MarketplaceModule,
    UserModule,
    BlockchainSelectorModule,
    AdminModule
  ],
  providers: [
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
