import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { AlchemyApiService } from 'src/app/services/alchemy-api.service';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { NFT, OwnedNFTs } from 'src/types/nft.model';

@Component({
  selector: 'app-my-nft',
  templateUrl: './my-nft.component.html',
  styleUrls: ['./my-nft.component.scss']
})
export class MyNftComponent implements OnInit {

  nft$: Observable<OwnedNFTs> = new Observable();
  public isMarketplaceApproved: boolean = false;

  constructor(
    private alchemyApiService: AlchemyApiService,
    private matDialog: MatDialog,
    private ticked1155Service: EventService,
  ) { }

  async ngOnInit() {
    this.nft$ = await (await this.alchemyApiService.getUserNfts())
  }

  /**
   * Function opens dialog for selling NFT 
   * 
   */
  sellTicket(_nft: NFT) {
  }

}
