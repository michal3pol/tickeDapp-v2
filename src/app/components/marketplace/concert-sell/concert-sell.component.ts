import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventData, EventInfo, EventType } from 'src/types/event.model';
import { NftEventMetadata } from 'src/types/nft.model';

@Component({
  selector: 'app-concert-sell',
  templateUrl: './concert-sell.component.html',
  styleUrls: ['./concert-sell.component.scss']
})
export class ConcertSellComponent implements OnInit {

  constructor(
    private eventFactoryService: EventFactoryService,
    private router: Router,
    private nftStorageService: NftStorageService
  ) { }

  public eventsInfo: EventInfo[] = [];
  public events: EventData[] = [];
  public searchText = '';
  eventTypes = EventType;
  selectedType: string[] = ['0'];

  async ngOnInit() {
    this.updateData();
  }

  async onSelectedTypeChange(event: any) {
    this.updateData();
  }

  async updateData() {
    this.eventsInfo = await this.eventFactoryService.getEventsByType(Number(this.selectedType[0]));
    this.eventsInfo.forEach(info => {
      this.nftStorageService.getStorageConcertInfo(info.descLink).subscribe(
        ipfsResponse => this.events.push(
          {
            ...ipfsResponse,
            eventAddress: info.eventAddress
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
  goToConcert(eventAddress: string) {
    this.router.navigate(['sell', eventAddress]);
  }

}
