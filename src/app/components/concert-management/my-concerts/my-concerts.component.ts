import { Component, OnInit } from '@angular/core';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { WalletService } from 'src/app/services/wallet.service';
import { DepConcert } from 'src/types/concert.model';

@Component({
  selector: 'app-my-concerts',
  templateUrl: './my-concerts.component.html',
  styleUrls: ['./my-concerts.component.scss']
})
export class MyConcertsComponent implements OnInit {

  constructor(
    private tickedFactoryService: EventFactoryService,
    private walletService: WalletService,
    private ticked1155Service: EventService,
  ) { }

  public deployedConcerts: DepConcert[] = [];
  public newDate!: Date;

  async ngOnInit() {
    this.deployedConcerts = await this.tickedFactoryService.getDepContracts(
      await this.walletService.getWalletAddress() )
  }

  /**
   * Fires transaction that mint tickets for specified contract
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  public async mintTickets(contractAddress: string) {
    this.ticked1155Service.createAndMintTickets(contractAddress)
  }

  /**
   * Add sectors for specified contract
   *
   * @param address - Address of concert contract
   * @param sectors - list of new sectors
   * 
   */
  addSectors(sectors: string[], address: string) {
    this.ticked1155Service.addSectors(address, sectors)
  }

   /**
   * Withdraws money for specified contract
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  withdraw(concertAddress: string) {
    this.ticked1155Service.withdraw(concertAddress);
  }

   /**
   * Changes date of concert for specified contract
   *
   * @param contractAddress - Address of concert contract
   *  
   */
  changeDate(concertAddress: string) {
    if(this.newDate != undefined) {
      const newDateUnix = (new Date(this.newDate!)).getTime() / 1000;
      this.ticked1155Service.setDate(concertAddress, newDateUnix);
    }
  }
}
