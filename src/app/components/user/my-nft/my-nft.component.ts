import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlchemyApiService } from 'src/app/services/alchemy-api.service';
import { OwnedNFTs } from 'src/types/nft.model';

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
  ) { }

  async ngOnInit() {
    this.nft$ = await (await this.alchemyApiService.getUserNfts())
  }

}
