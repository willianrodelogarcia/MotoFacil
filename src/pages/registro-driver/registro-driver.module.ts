import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroDriverPage } from './registro-driver';

@NgModule({
  declarations: [
    RegistroDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroDriverPage),
  ],
})
export class RegistroDriverPageModule {}
