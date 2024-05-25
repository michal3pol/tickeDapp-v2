import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AlchemyApiService } from 'src/app/services/alchemy-api.service';
import { BlockchainSelectorService } from 'src/app/services/blockchain-selector.service';
import { WalletService } from 'src/app/services/wallet.service';
import { OwnedNFTs } from 'src/types/nft.model';

@Component({
  selector: 'app-my-nft',
  templateUrl: './my-nft.component.html',
  styleUrls: ['./my-nft.component.scss']
})
export class MyNftComponent implements OnInit {

  nft$: Observable<OwnedNFTs | undefined> = new Observable();
  public isMarketplaceApproved: boolean = false;

  constructor(
    private alchemyApiService: AlchemyApiService,
    private blockchainSelectorService: BlockchainSelectorService,
    private walletService: WalletService
  ) { }

  async ngOnInit() {
    this.nft$ = this.blockchainSelectorService.selectedBlockchain$.pipe(
      switchMap(async blockchain => {
        const walletAddres = await this.walletService.getWalletAddress() 
        return this.alchemyApiService.getUserNfts(blockchain.blockchainAppApi, walletAddres).toPromise()
      })
    )
  }

}
