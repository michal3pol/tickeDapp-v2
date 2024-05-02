import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NftStorageService } from 'src/app/services/nft-storage.service';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
    concertDescription: ['', [Validators.required, Validators.minLength(8)]],
    concertDate: ['', Validators.required],
    concertImage: ['', Validators.required],
  })

  ipfsApiKey = new FormControl('', [Validators.required]);

  constructor(
    private eventFactoryService: EventFactoryService,
    private formBuilder: FormBuilder,
    private nftStorageService: NftStorageService,
    private snackbarService: SnackbarService
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

    if(this.ipfsApiKey.value){
      const ipfsLink = await this.createIpfsData(this.ipfsApiKey.value);
      console.log(ipfsLink)
 
      // this.eventFactoryService.createEventContract(
      //   this.commonInf.get('concertName')?.getRawValue(),
      //   this.commonInf.get('concertDescription')?.getRawValue(),
      //   unixTimestamp,
      //   this.commonInf.get('concertImage')?.getRawValue(),
      //   this.concertSectors
      // )
    } else {
      this.snackbarService.error("Provide ipfs api key!")
    }
  }

  createIpfsData(apiKey: string) {  
    let eventData: EventData = {
      name: this.commonInf.get('concertName')?.getRawValue(),
      description: this.commonInf.get('concertDescription')?.getRawValue(),
      date: this.commonInf.get('concertDate')?.getRawValue(),
      sectors: this.concertSectors
    } 

    return this.nftStorageService.storeAtIpfs(eventData, apiKey);
  }

  /**
   * Function that add sectors to concert informations
   */
  addSectors(sectors: SectorData[]) {
    this.concertSectors = sectors
  }
  

}