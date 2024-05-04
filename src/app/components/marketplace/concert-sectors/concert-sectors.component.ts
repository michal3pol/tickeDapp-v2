import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector, Ticket } from 'src/types/concert.model';
import { AudienceLayoutComponent } from '../audience-layout/audience-layout.component';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { EventData, SectorData } from 'src/types/event.model';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-concert-sectors',
  templateUrl: './concert-sectors.component.html',
  styleUrls: ['./concert-sectors.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConcertSectorsComponent {

  selectedSector!: SectorData;
  ticketsMap: Map<number, Ticket> = new Map<number, Ticket>;
  amount = 1;
  selectedStandardTickets: boolean = true;

  eventData!: EventData;
  eventData$: Observable<EventData> = new Observable(observer => {
    if(window.history.state.eventData) {
      observer.next(window.history.state.eventData);
      this.eventData = window.history.state.eventData;
      observer.complete();
    } else {
      const ipfsQueryParam = this.route.snapshot.queryParamMap.get('ipfs');
        if (ipfsQueryParam) {
          this.nftStorageService.getStorageConcertInfo(ipfsQueryParam).subscribe(
            data => {
              observer.next(data);
              this.eventData = data;
              observer.complete();
            }
          );
        }
    }
  }) 

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private nftStorageService: NftStorageService
  ) { }


  /**
   * Function that changes currently chosen sector 
   * 
   * @param index - Index of sector 
   */
  selectSector(index: number) {
    this.selectedStandardTickets = true;
    this.selectedSector = this.eventData.sectors[index];
  }

  /**
   * Function that shows dialog with layout  
   */
  showLayout(){
    let dialogRef = this.matDialog.open(AudienceLayoutComponent, {
      maxHeight: '80%',
      maxWidth: '80%',
      data: { image: this.eventData.image }
    });
  }
}
