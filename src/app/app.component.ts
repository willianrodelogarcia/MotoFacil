import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapUserPage } from '../pages/map-user/map-user';
import { PedirServicioPage } from '../pages/pedir-servicio/pedir-servicio';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MapUserPage;  
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

