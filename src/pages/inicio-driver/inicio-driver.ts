import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverPage } from '../driver/driver';

/**
 * Generated class for the InicioDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-driver',
  templateUrl: 'inicio-driver.html',
})
export class InicioDriverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioDriverPage');
  }


  driver(){
    this.navCtrl.setRoot(DriverPage);
  }
}
