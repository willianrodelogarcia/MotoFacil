import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { MapUserPageModule } from '../pages/map-user/map-user.module';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceMotoProvider } from '../providers/service-moto/service-moto';
import { HttpClientModule } from '@angular/common/http';
import { MapDriverPage } from '../pages/map-driver/map-driver';
import { MapDriverPageModule } from '../pages/map-driver/map-driver.module';
import { RegistroDriverPageModule } from '../pages/registro-driver/registro-driver.module';
import { RegistroUserPageModule } from '../pages/registro-user/registro-user.module';
import { MapUserPage } from '../pages/map-user/map-user';
import { RegistroUserPage } from '../pages/registro-user/registro-user';
import { RegistroDriverPage } from '../pages/registro-driver/registro-driver';




@NgModule({
  declarations: [ 
    MyApp,
    HomePage,
    
  ],
  imports: [
    BrowserModule,
    MapUserPageModule,
    MapDriverPageModule,
    RegistroDriverPageModule,
    RegistroUserPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapDriverPage,
    MapUserPage,
    RegistroUserPage,
    RegistroDriverPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceMotoProvider
  ]
})
export class AppModule {}
