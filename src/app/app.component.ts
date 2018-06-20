import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
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
import { ContactosPage } from '../pages/contactos/contactos';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage; 

  constructor(private alertCtrl: AlertController, private oneSignal: OneSignal,public serviceMoto: ServiceMotoProvider,private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.handlerNotifications();
    });

  }

  private handlerNotifications(){
    this.oneSignal.startInit('5f4cf235-8b4c-430b-9575-0cd1ddd6d11d', '665939999222');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      /*let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();*/
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
    this.oneSignal.enableVibrate(true);
    this.oneSignal.enableSound(true);
  }

}

