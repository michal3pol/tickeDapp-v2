import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import EtherUnitConverter from 'src/app/utils/EtherUnitConverter';
import { SectorData } from 'src/types/event.model';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent {

  // toggle for specifying button at the bottom of comp
  @Input() createConcertForm: boolean = false;

  @Output() sectorsEvent = new EventEmitter<SectorData []>();

  form = this.formBuilder.group({
    sectors: this.formBuilder.array([])
  })

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  get sectors() {
    return this.form.controls['sectors'] as FormArray
  }

  /**
   * Function that adds new forms for sectors
   */
  addSector() {
    const sectorForm = this.formBuilder.group({
      sectorName: ['', Validators.required],
      isNumerable:  ['', Validators.required],
      seatStart:  ['1', Validators.required],
      seatStop:  ['', Validators.required],
      mintNow:   ['', Validators.required],
      price:  ['', Validators.required]
    })

    this.sectors.push(sectorForm)
  }

  /**
   * Function that deletes sector from structure
   */
  deleteSector(sectorIndex: number) {
    this.sectors.removeAt(sectorIndex)
  }

  
  /**
   * Function that creates structure of information based on provided data in forms
   */
  confirmSectors() {
    let sectorsArray: SectorData [] =[];

    for(let sector of this.sectors.value) {
        const newSector: SectorData = {
          name: sector.sectorName,
          numerableSeats: sector.isNumerable,
          seatsFrom: parseInt(sector.seatStart),
          seatsTo: parseInt(sector.seatStop),
          price: EtherUnitConverter.etherToWei(sector.price).toString()
        }
        sectorsArray.push(newSector);
    }
    this.sectorsEvent.emit(sectorsArray);
  }

}
