import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerFeeComponent } from './organizer-fee/organizer-fee.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrganizerFeeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    OrganizerFeeComponent
  ]
})
export class AdminModule { }
