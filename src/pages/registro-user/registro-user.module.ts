import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroUserPage } from './registro-user';

@NgModule({
  declarations: [
    RegistroUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroUserPage),
  ],
})
export class RegistroUserPageModule {}
