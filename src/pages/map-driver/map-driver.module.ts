import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapDriverPage } from './map-driver';

@NgModule({
  declarations: [
    MapDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(MapDriverPage),
  ],
})
export class MapDriverPageModule {}
