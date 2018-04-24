import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapUserPage } from '../pages/map-user/map-user';
import { MapUserPageModule } from '../pages/map-user/map-user.module';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceMotoProvider } from '../providers/service-moto/service-moto';
import { HttpClientModule } from '@angular/common/http';
import { PedirServicioPage } from '../pages/pedir-servicio/pedir-servicio';
import { PedirServicioPageModule } from '../pages/pedir-servicio/pedir-servicio.module';

@NgModule({
  declarations: [ 
    MyApp,
    HomePage,
    
  ],
  imports: [
    BrowserModule,
    MapUserPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
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
