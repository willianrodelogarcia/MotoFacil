import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioUserPage } from './inicio-user';

@NgModule({
  declarations: [
    InicioUserPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioUserPage),
  ],
})
export class InicioUserPageModule {}
