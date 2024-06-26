import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit{

  isAdmin: boolean = false;
  
  constructor(
    private walletService: WalletService,
    private eventFactoryService: EventFactoryService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { 
  }

  async ngOnInit() {
    this.isAdmin = await this.eventFactoryService.validateOwner(
      await this.walletService.getWalletAddress()); 
}

  /**
   * Function that connects wallet
   *
   */
  async connectWallet() {
    let isLogged = await this.walletService.logIn();
    if(isLogged){
      this.snackbarService.success("You are already connected")
    }
  }

  /**
   * Function that redirects to concert-form page
   *
   */
  async goToConcertForm() {
    const navigationDetails: string[] = ['/create-concert'];
    this.router.navigate(navigationDetails);
  }

  /**
   * Function that redirects to my-concerts page
   *
   */
  async goToMyConcerts() {
    const navigationDetails: string[] = ['/my-concerts'];
    this.router.navigate(navigationDetails);
  }

  /**
   * Function that redirects to marketplace page
   *
   */
  goToMarketplace() {
    const navigationDetails: string[] = ['/marketplace/sell'];
    this.router.navigate(navigationDetails);
  }

  /**
   * Function that redirects to my-nfts page
   *
   */
  goToMyNfts() {
    const navigationDetails: string[] = ['/my-nft'];
    this.router.navigate(navigationDetails);
  }

  goToAdminPage() {
    const navigationDetails: string[] = ['/admin-org-fee'];
    this.router.navigate(navigationDetails);
  }
}
