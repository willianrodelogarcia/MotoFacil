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
import { UserPage } from '../pages/user/user';
import { DriverPage } from '../pages/driver/driver';
import { UserPageModule } from '../pages/user/user.module';
import { DriverPageModule } from '../pages/driver/driver.module';
import { LoginDriverPage } from '../pages/login-driver/login-driver';
import { LoginUserPage } from '../pages/login-user/login-user';
import { LoginDriverPageModule } from '../pages/login-driver/login-driver.module';
import { LoginUserPageModule } from '../pages/login-user/login-user.module';
import { VehiculoPageModule } from '../pages/vehiculo/vehiculo.module';
import { VehiculoPage } from '../pages/vehiculo/vehiculo';
import { ActivarServicioPage } from '../pages/activar-servicio/activar-servicio';
import { ActivarServicioPageModule } from '../pages/activar-servicio/activar-servicio.module';
import { InfoMotoPageModule } from '../pages/info-moto/info-moto.module';
import { InfoMotoPage } from '../pages/info-moto/info-moto';




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
    UserPageModule,
    DriverPageModule,
    LoginDriverPageModule,
    LoginUserPageModule,
    VehiculoPageModule,
    ActivarServicioPageModule,
    HttpClientModule,
    InfoMotoPageModule,
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapDriverPage,
    MapUserPage,
    RegistroUserPage,
    RegistroDriverPage,
    UserPage,
    LoginDriverPage,
    LoginUserPage,
    DriverPage,
    VehiculoPage,
    ActivarServicioPage,
    InfoMotoPage
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
