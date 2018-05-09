import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioDriverPage } from './inicio-driver';

@NgModule({
  declarations: [
    InicioDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioDriverPage),
  ],
})
export class InicioDriverPageModule {}
