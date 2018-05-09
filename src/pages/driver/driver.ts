import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginDriverPage } from '../login-driver/login-driver';
import { RegistroDriverPage } from '../registro-driver/registro-driver';

/**
 * Generated class for the DriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

  ingresar(){
    this.navCtrl.push(LoginDriverPage);
  }


  registrar(){
    this.navCtrl.push(RegistroDriverPage);
  }



}
