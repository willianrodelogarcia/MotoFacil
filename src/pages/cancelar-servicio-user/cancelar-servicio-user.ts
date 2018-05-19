import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { MapUserPage } from '../map-user/map-user';

/**
 * Generated class for the CancelarServicioUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancelar-servicio-user',
  templateUrl: 'cancelar-servicio-user.html',
})
export class CancelarServicioUserPage {

  correoU: any;
  correoC: any;
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.correoC = navParams.get("correoC");
    this.correoU = navParams.get("correoU");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelarServicioUserPage');
  }

  razon(r){
    this.serviceMoto.cambiarEstadoServicio(this.correoU,"cancelarU").then((cancela)=>{
      console.log(cancela)
    });
    this.serviceMoto.cancelaU(this.correoU,this.correoC,r).then((razon)=>{
      console.log(razon)
      //this.viewCtrl.dismiss();
      this.navCtrl.setRoot(MapUserPage);
    });
    console.log(r)
  }

}
