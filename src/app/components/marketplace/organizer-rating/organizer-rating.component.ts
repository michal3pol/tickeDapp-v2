import { Component, Input, OnInit } from '@angular/core';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventService } from 'src/app/services/smartcontracts/event.service';
import { RateScore } from 'src/types/event.model';

@Component({
  selector: 'app-organizer-rating',
  templateUrl: './organizer-rating.component.html',
  styleUrls: ['./organizer-rating.component.scss']
})
export class OrganizerRatingComponent implements OnInit {

  @Input()
  eventAddress!: string;

  orgAddress: string = '';
  orgScore: RateScore = { postiveVotes: 0, negativeVotes: 0 }

  constructor(
    private eventFactoryService: EventFactoryService,
    private eventService: EventService
  ) { 
    
  }

  async ngOnInit() {
    this.orgAddress = await this.eventService.getOrgAddress(this.eventAddress)
    this.orgScore = await this.eventFactoryService.getOrganizerScore(this.orgAddress)
  }

  addVote(vote: boolean) {
    this.eventFactoryService.rateOrganizer(this.orgAddress, vote)
  }

}
