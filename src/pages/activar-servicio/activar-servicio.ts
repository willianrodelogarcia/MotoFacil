import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the ActivarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activar-servicio',
  templateUrl: 'activar-servicio.html',
})
export class ActivarServicioPage {
  foto:any;
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {
    //this.navParams.get("placa");
    this.serviceMoto.getMotos().then((data)=>{

      this.foto = data["data"][0].fotoConductor;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarServicioPage');
  }

}
