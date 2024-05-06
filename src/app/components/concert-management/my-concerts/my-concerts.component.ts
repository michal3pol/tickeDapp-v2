import { Component, OnInit } from '@angular/core';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { WalletService } from 'src/app/services/wallet.service';
import { EventData, SectorData } from 'src/types/event.model';

@Component({
  selector: 'app-my-concerts',
  templateUrl: './my-concerts.component.html',
  styleUrls: ['./my-concerts.component.scss']
})
export class MyConcertsComponent implements OnInit {

  constructor(
    private eventFactoryService: EventFactoryService,
    private walletService: WalletService,
    private eventService: EventService,
    private nftStorageService: NftStorageService
  ) { }

  public deployedEvents: string[] = [];
  public newDate!: Date;
  events: EventData[] = [];
  seatOccupancyMap = new Map<string, number>;

  async ngOnInit() {
    this.deployedEvents = await this.eventFactoryService.getOrganizerEvents(
      await this.walletService.getWalletAddress())

    this.deployedEvents.forEach(async eventAddr => {
      const ipfsLink = await this.eventService.getIpfsLink(eventAddr)
      this.nftStorageService.getStorageConcertInfo(ipfsLink).subscribe(
          ipfsResponse => this.events.push(
            {
              ...ipfsResponse,
              eventAddress: eventAddr,
              ipfsLink: ipfsLink
            }
          )
        )
      })
  }

   /**
   * Withdraws money for specified contract
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  withdraw(eventAddr: string | undefined) {
    if(eventAddr)
      this.eventService.withdrawOrgCredits(eventAddr);
  }

  async checkOccupancy(eventAddr: string | undefined, eventSectors: SectorData[]) {
    if(eventAddr){
      const soldTokenIds = await this.eventService.getSoldTokenIds(eventAddr)
      let tokenIds: number = 0;
      eventSectors.forEach(sector => 
        tokenIds += sector.tokenIds?.length ? sector.tokenIds?.length: 0)
      this.seatOccupancyMap.set(eventAddr, (soldTokenIds.length / tokenIds) * 100)
    }
  }


}
