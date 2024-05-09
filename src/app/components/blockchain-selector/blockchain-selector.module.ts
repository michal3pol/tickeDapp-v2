import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockchainSelectorComponent } from './blockchain-selector.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    BlockchainSelectorComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
  ],
  exports: [
    BlockchainSelectorComponent
  ]
})
export class BlockchainSelectorModule { }
