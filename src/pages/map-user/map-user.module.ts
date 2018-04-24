import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapUserPage } from './map-user';
import { MapComponent } from '../../components/map/map';
import { PedirServicioPageModule } from '../pedir-servicio/pedir-servicio.module';

@NgModule({
  declarations: [
    MapUserPage,
  ],
  imports: [ 
    PedirServicioPageModule,
    IonicPageModule.forChild(MapUserPage),
  ],
})
export class MapUserPageModule {}
