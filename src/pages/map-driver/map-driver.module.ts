import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapDriverPage } from './map-driver';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MapDriverPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(MapDriverPage),
  ],
})
export class MapDriverPageModule {}
