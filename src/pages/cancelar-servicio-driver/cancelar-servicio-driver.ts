import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { MapDriverPage } from '../map-driver/map-driver';


/**
 * Generated class for the CancelarServicioDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancelar-servicio-driver',
  templateUrl: 'cancelar-servicio-driver.html',
})
export class CancelarServicioDriverPage {
  
  correoC: any;
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.correoC = navParams.get("correoC");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelarServicioDriverPage');
  }

  razon(r){
    
    this.serviceMoto.cancelaC(this.correoC,r).then((razon)=>{
      console.log(razon)
      //this.viewCtrl.dismiss();
      this.navCtrl.setRoot(MapDriverPage);
    });
    console.log(r)
  }

}
