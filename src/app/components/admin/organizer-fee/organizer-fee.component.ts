import { Component } from '@angular/core';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import EtherUnitConverter from 'src/app/utils/EtherUnitConverter';

@Component({
  selector: 'app-organizer-fee',
  templateUrl: './organizer-fee.component.html',
  styleUrls: ['./organizer-fee.component.scss']
})
export class OrganizerFeeComponent {

  constructor(
    private eventFactoryService: EventFactoryService
  ) { }

  organizerFee: number = 0;

  setOrgFee(){
    this.eventFactoryService.updateOrgFee(EtherUnitConverter.etherToWei(this.organizerFee));
  }

}
