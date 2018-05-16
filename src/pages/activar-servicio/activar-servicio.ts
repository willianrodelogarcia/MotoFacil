import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { MapDriverPage } from '../map-driver/map-driver';

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
  foto: any;
  estadoC: boolean;
  correo: string;
  constructor(public serviceMoto: ServiceMotoProvider, public navCtrl: NavController, public navParams: NavParams) {
    //this.navParams.get("placa");
    this.serviceMoto.getEmail().then((email) => {
      this.correo = email;

      this.serviceMoto.getMotos(this.correo).then((data) => {

        this.foto = data["data"][0].fotoConductor;
        console.log(this.foto)
      });


      this.serviceMoto.getConductoresEmail(this.correo).then((datos) => {
        console.log(datos["data"])
        if (datos["data"][0].estadoC == "1") {
          this.estadoC = true;
          this.serviceMoto.cambiarEstado(this.correo, 1).then((peticion) => {
            console.log(peticion)
            this.navCtrl.setRoot(MapDriverPage);
          });
          
        } else {
          this.estadoC = false;
          this.serviceMoto.cambiarEstado(this.correo, 0).then((peticion) => {
            console.log(peticion)
          });
        }

      });

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarServicioPage');

  }

  disponibilidad(evt) {
    console.log(evt.checked)
    if (!evt.checked) {
      this.serviceMoto.cambiarEstado(this.correo, 0).then((peticion) => {
        console.log(peticion)
        
      });
      //this.navCtrl.setRoot(MapDriverPage);
      console.log("Se fue")
    }else{
      this.serviceMoto.cambiarEstado(this.correo, 1).then((peticion) => {
        console.log(peticion)
        this.navCtrl.setRoot(MapDriverPage);
      });
    }
  }

}
