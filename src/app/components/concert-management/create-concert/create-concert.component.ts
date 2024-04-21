import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';

@Component({
  selector: 'app-create-concert',
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.scss']
})
export class CreateConcertComponent implements OnInit {

  concertSectors: string [] = [];

  commonInf = this.formBuilder.group({
    concertName: ['', Validators.required],
    concertDescription: ['', Validators.required, Validators.minLength(8)],
    concertDate: ['', Validators.required],
    concertImage: ['', Validators.required],
  })


  constructor(
    private tickedFactoryService: EventFactoryService,
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
    // @TODO 
    // this.tickedFactoryService.createConcertContract(
    //   this.commonInf.get('concertName')?.getRawValue(),
    //   this.commonInf.get('concertDescription')?.getRawValue(),
    //   unixTimestamp,
    //   this.commonInf.get('concertImage')?.getRawValue(),
    //   this.concertSectors
    // )
  }

  /**
   * Function that add sectors to concert informations
   */
  addSectors(sectors: string[]) {
    this.concertSectors = sectors
  }

}