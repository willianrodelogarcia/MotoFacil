import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { ActivarServicioPage } from '../activar-servicio/activar-servicio';
import { InfoMotoPage } from '../info-moto/info-moto';

/**
 * Generated class for the VehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehiculo',
  templateUrl: 'vehiculo.html',
})
export class VehiculoPage {

  correoC(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  motos:any[];

  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.serviceMoto.getMotos(this.correoC).then((data)=>{

      this.motos = data["data"];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculoPage');
  }


  selectMoto(placa){
    //Falta la validacion para determinar si ya el conductor registro su Moto al sistemas
    //this.navCtrl.push(InfoMotoPage,{placa:placa});
    this.navCtrl.setRoot(ActivarServicioPage,{placa:placa});
  }

}
