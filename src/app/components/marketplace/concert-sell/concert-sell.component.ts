import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { DepConcert } from 'src/types/concert.model';

@Component({
  selector: 'app-concert-sell',
  templateUrl: './concert-sell.component.html',
  styleUrls: ['./concert-sell.component.scss']
})
export class ConcertSellComponent implements OnInit {

  constructor(
    private eventFactoryService: EventFactoryService,
    private router: Router,
  ) { }

  public concerts: DepConcert[] = [];
  public concertOrg: string[] = [];
  public searchText = '';

  async ngOnInit() {
    // @TODO fetch data properly 
    // this.concertOrg = await this.tickedFactoryService.getOrganizers();
    // for (let org of this.concertOrg) {
    //   this.concerts = this.concerts.concat(await this.tickedFactoryService.getDepContracts(org));
    // }
  }

  /**
   * Function that redirects to chosen concert
   *
   * @param contractAddress - Address of concert contract 
   * 
   */
  goToConcert(concertAddress: string) {
    this.router.navigate(['sell', concertAddress]);
  }

}
