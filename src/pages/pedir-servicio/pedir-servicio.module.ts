import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedirServicioPage } from './pedir-servicio';

@NgModule({
  declarations: [
    PedirServicioPage,
  ],
  imports: [
    IonicPageModule.forChild(PedirServicioPage),
  ],
})
export class PedirServicioPageModule {}
