import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelarServicioUserPage } from './cancelar-servicio-user';

@NgModule({
  declarations: [
    CancelarServicioUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelarServicioUserPage),
  ],
})
export class CancelarServicioUserPageModule {}
