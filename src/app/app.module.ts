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
import { IonicStorageModule } from '@ionic/storage';
import { CancelarServicioDriverPageModule } from '../pages/cancelar-servicio-driver/cancelar-servicio-driver.module';
import { CancelarServicioDriverPage } from '../pages/cancelar-servicio-driver/cancelar-servicio-driver';
import { ContactosPageModule } from '../pages/contactos/contactos.module';
import { ContactosPage } from '../pages/contactos/contactos';
import { RegistrarContactosPage } from '../pages/registrar-contactos/registrar-contactos';
import { RegistrarContactosPageModule } from '../pages/registrar-contactos/registrar-contactos.module';
import { CancelarServicioUserPageModule } from '../pages/cancelar-servicio-user/cancelar-servicio-user.module';
import { CancelarServicioUserPage } from '../pages/cancelar-servicio-user/cancelar-servicio-user';


import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { InicioUserPageModule } from '../pages/inicio-user/inicio-user.module';
import { InicioUserPage } from '../pages/inicio-user/inicio-user';





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
    ContactosPageModule,
    RegistrarContactosPageModule,
    CancelarServicioUserPageModule,
    CancelarServicioDriverPageModule,
    InicioUserPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    ContactosPage,
    RegistrarContactosPage,
    ActivarServicioPage,
    CancelarServicioDriverPage,
    CancelarServicioUserPage,
    InicioUserPage,
    InfoMotoPage 
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    Storage,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    ServiceMotoProvider
  ]
})
export class AppModule {}
