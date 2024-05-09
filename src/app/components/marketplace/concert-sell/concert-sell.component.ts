import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlockchainSelectorService } from 'src/app/services/blockchain-selector.service';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventData, EventInfo, EventType } from 'src/types/event.model';

@Component({
  selector: 'app-concert-sell',
  templateUrl: './concert-sell.component.html',
  styleUrls: ['./concert-sell.component.scss']
})
export class ConcertSellComponent implements OnInit, OnDestroy {

  constructor(
    private eventFactoryService: EventFactoryService,
    private router: Router,
    private nftStorageService: NftStorageService,
    private blockchainSelectorService: BlockchainSelectorService
  ) { }

  public eventsInfo: EventInfo[] = [];
  public events: EventData[] = [];
  public searchText = '';
  eventTypes = EventType;
  selectedType: string[] = ['0'];
  subscription = new Subscription();

  async ngOnInit() {
    this.updateData();
    this.subscription = this.blockchainSelectorService.selectedBlockchain$.subscribe(
      blockchain => this.updateData())
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  async onSelectedTypeChange(event: any) {
    this.updateData();
  }

  async updateData() {
    this.eventsInfo = [];
    this.events = [];
    this.eventsInfo = await this.eventFactoryService.getEventsByType(Number(this.selectedType[0]));
    this.eventsInfo.forEach(info => {
      this.nftStorageService.getStorageConcertInfo(info.descLink).subscribe(
        ipfsResponse => this.events.push(
          {
            ...ipfsResponse,
            eventAddress: info.eventAddress,
            ipfsLink: info.descLink
          }
        )
      )
    })
  }

  /**
   * Function that redirects to chosen concert
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  goToEvent(event: EventData) {
    this.router.navigate(['marketplace/sell', event.eventAddress], {
      queryParams: {ipfs: event.ipfsLink},
      state: { eventData: event }
    });
  }

}
