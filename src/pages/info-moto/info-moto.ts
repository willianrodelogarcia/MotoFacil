import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivarServicioPage } from '../activar-servicio/activar-servicio';
import { VehiculoPage } from '../vehiculo/vehiculo';

/**
 * Generated class for the InfoMotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-moto',
  templateUrl: 'info-moto.html',
})
export class InfoMotoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoMotoPage');
  }

  registrarMoto(){
    console.log("funciona")
    this.navCtrl.setRoot(VehiculoPage);
  }

}
