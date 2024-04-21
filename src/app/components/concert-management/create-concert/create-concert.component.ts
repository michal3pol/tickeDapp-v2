import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { EventData, SectorData } from 'src/types/event.model';

@Component({
  selector: 'app-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.scss']
})
export class CreateConcertComponent implements OnInit {

  concertSectors: SectorData [] = [];

  commonInf = this.formBuilder.group({
    concertName: ['', Validators.required],
    concertDescription: ['', Validators.required, Validators.minLength(8)],
    concertDate: ['', Validators.required],
    concertImage: ['', Validators.required],
  })


  constructor(
    private eventFactoryService: EventFactoryService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public contractsAddress: string[] = [];


  /**
   * Function that creates structure of information based on provided data in forms
   */
  public async createConcert() {
    let stringTime = this.commonInf.get('concertDate')?.getRawValue().toString();
    let unixTimestamp = (new Date(stringTime!)).getTime() / 1000;

    this.createIpfsData();

    // @TODO 
    // this.tickedFactoryService.createConcertContract(
    //   this.commonInf.get('concertName')?.getRawValue(),
    //   this.commonInf.get('concertDescription')?.getRawValue(),
    //   unixTimestamp,
    //   this.commonInf.get('concertImage')?.getRawValue(),
    //   this.concertSectors
    // )
  }

  createIpfsData() {  
    let eventData: EventData = {
      name: this.commonInf.get('concertName')?.getRawValue(),
      description: this.commonInf.get('concertDescription')?.getRawValue(),
      date: this.commonInf.get('concertDate')?.getRawValue(),
      sectors: this.concertSectors
    } 

    
  }

  /**
   * Function that add sectors to concert informations
   */
  addSectors(sectors: SectorData[]) {
    this.concertSectors = sectors
  }
  

}