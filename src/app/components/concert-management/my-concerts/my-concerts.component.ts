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
    private eventFactoryService: EventFactoryService,
    private walletService: WalletService,
    private ticked1155Service: EventService,
  ) { }

  public deployedConcerts: DepConcert[] = [];
  public newDate!: Date;

  async ngOnInit() {
    // @TODO
    // this.deployedConcerts = await this.tickedFactoryService.getDepContracts(
    //   await this.walletService.getWalletAddress())
    this.deployedConcerts = [];
  }

  /**
   * Fires transaction that mint tickets for specified contract
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  public async mintTickets(contractAddress: string) {
    // @TODO remove
    // this.ticked1155Service.createAndMintTickets(contractAddress)
  }

   /**
   * Withdraws money for specified contract
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  withdraw(concertAddress: string) {
    this.ticked1155Service.withdrawOrgCredits(concertAddress);
  }

}
