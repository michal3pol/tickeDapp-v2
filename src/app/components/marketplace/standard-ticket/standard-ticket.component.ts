import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BigNumber } from 'ethers';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { SectorData } from 'src/types/event.model';
import { Attribute, NftTicketMetadata, TRAIT_TYPE } from 'src/types/nft.model';

@Component({
  selector: 'app-standard-ticket',
  templateUrl: './standard-ticket.component.html',
  styleUrls: ['./standard-ticket.component.scss'],
})
export class StandardTicketComponent implements OnChanges {

  @Input() eventAddress!: string;
  @Input() ipfsLink!: string;
  @Input() sector!: SectorData;
  // map - ticketId -> tickerAttr
  tickets: NftTicketMetadata [] = [];
  amount = 1;

  public TRAIT_TYPE = TRAIT_TYPE;


  constructor(
    private eventService: EventService,
    private nftStorageService: NftStorageService
  ) { }
  
  async ngOnChanges(changes: SimpleChanges) {
    if(changes['sector'].currentValue == undefined || 
              this.eventAddress == undefined ){
      return
    }

    this.tickets = [];
    // @TODO somehow handle available tickets
    // dodac metode w smartcontracie co zapisuje sprzedane bilety, a pozniej tylko odflitorwac 
    const availableTickets: number[] = this.sector.tokenIds!; 
    // this.validateAvailability(
    //   changes['sector'].currentValue.availableTokenIds, 
    //   await this.ticked1155Service.getSectorSoldIds(
    //     this.concertAddress, changes['sector'].currentValue.name)
    //   );

    for(let tokenId of availableTickets) {
      this.nftStorageService.getNftDataFromStorage(this.ipfsLink, tokenId).subscribe(
        ticketData => this.tickets.push(ticketData)
      ) 
    }
  }

  /**
   * Function that calculate tokens availabilty 
   *
   * @param allTickets - List of all possible tokens 
   * @param soldTickets - List of already sold tickets
   * @returns List of currently available tokens
   * 
   */
  validateAvailability(allTickets: BigNumber[], soldTickets: BigNumber[]): number[] {
      let resultArray: number[] = [];
      for(let ticketId of allTickets){
        // if soldTickets does not contain ticketId -> push
        if( !soldTickets.some(id => id.toNumber() == ticketId.toNumber())) {
          resultArray.push(ticketId.toNumber());
        }
      }
      return resultArray;
  }

  /**
   * Function that fires transaction for buying ticket 
   *
   * @param tokenId - Token ID 
   * @param price - Token price
   * @param amount - Amount of tokens to buy (by default sets to 1)
   * 
   */
  buyTicket(ticket: NftTicketMetadata, amount = 1) {
    const tokenId = Number(this.getAttributeByTraitType(ticket, TRAIT_TYPE.TOKEN_ID)?.value)
    const price = BigNumber.from(this.getAttributeByTraitType(ticket, TRAIT_TYPE.PRICE)?.value)

    this.eventService.buyTicket(
      this.eventAddress, tokenId, price, amount)
  }

  getAttributeByTraitType(ticket: NftTicketMetadata, traitType: TRAIT_TYPE): Attribute | undefined {
    return ticket.attributes.find(attribute => attribute.trait_type === traitType);
  }

}
