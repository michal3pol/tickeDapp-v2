import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ethers } from 'ethers';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  links = ['login', 'transfer']; // TO CHANGE ?(sell, resell)
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
  isLogged: boolean = false; // figure out how to disable button

  constructor(
    private walletService: WalletService,
  ) { }

  async connectWallet(): Promise<void> {
    this.isLogged = await this.walletService.logIn();
  }


}
