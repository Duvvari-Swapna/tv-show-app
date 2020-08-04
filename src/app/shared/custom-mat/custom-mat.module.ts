import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
 } from '@angular/material';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CardModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CardModule
  ],
  declarations: [],
  providers: []
})

export class CustomMatModule { }
