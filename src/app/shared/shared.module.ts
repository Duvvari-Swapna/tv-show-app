import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatModule } from './custom-mat/custom-mat.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomMatModule
  ],
  exports: [
    CustomMatModule
  ]
})
export class SharedModule { }
