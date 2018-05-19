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

  
  placa: any;
  correoC: string;
  motos:any[];

  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.serviceMoto.getEmail().then((correo)=>{
      this.correoC = correo;
      this.getConductor(correo);
    });
    /*this.serviceMoto.getMotos(this.correoC).then((data)=>{

      this.motos = data["data"];
      console.log(this.motos)
      if(data["data"] === []){
        //navCtrl.setRoot(ActivarServicioPage);
      }else{

      }
    });*/
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculoPage');
  }


  selectMoto(){
    //Falta la validacion para determinar si ya el conductor registro su Moto al sistemas
    //this.navCtrl.push(InfoMotoPage,{placa:placa});
     this.serviceMoto.getMotos(this.correoC).then((data)=>{

      this.motos = data["data"][0];
      console.log(this.motos)
      if(data["data"]){
        this.navCtrl.setRoot(InfoMotoPage,{placa:this.placa});  
        console.log("vacio")
      }else{
        this.navCtrl.setRoot(ActivarServicioPage,{placa:this.placa});
        console.log("no vacio")
      }
    });
    
  }

  getConductor(email){
    console.log(this.correoC)
    this.serviceMoto.getConductoresEmail(email).then((datos)=>{
      this.placa = datos["data"][0].placa;
      console.log(datos)
  });
  }

}
