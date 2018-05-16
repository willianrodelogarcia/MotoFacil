import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapUserPage } from './map-user';
import { Ionic2RatingModule } from "ionic2-rating";
import { PedirServicioPageModule } from '../pedir-servicio/pedir-servicio.module';

@NgModule({
  declarations: [
    MapUserPage,
  ],
  imports: [ 
    PedirServicioPageModule,
    Ionic2RatingModule,
    IonicPageModule.forChild(MapUserPage),
  ],
})
export class MapUserPageModule {}
