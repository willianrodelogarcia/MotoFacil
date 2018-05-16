import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapUserPage } from '../pages/map-user/map-user';
import { MapDriverPage } from '../pages/map-driver/map-driver';
import { HomePage } from '../pages/home/home';
import { DriverPage } from '../pages/driver/driver';
import { VehiculoPage } from '../pages/vehiculo/vehiculo';
import { InfoMotoPage } from '../pages/info-moto/info-moto';

import { Storage } from '@ionic/storage';
import { ServiceMotoProvider } from '../providers/service-moto/service-moto';
import { ActivarServicioPage } from '../pages/activar-servicio/activar-servicio';
import { CancelarServicioDriverPage } from '../pages/cancelar-servicio-driver/cancelar-servicio-driver';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage; 

  constructor(public serviceMoto: ServiceMotoProvider,private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

  }

}

