import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarContactosPage } from './registrar-contactos';

@NgModule({
  declarations: [
    RegistrarContactosPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarContactosPage),
  ],
})
export class RegistrarContactosPageModule {}
