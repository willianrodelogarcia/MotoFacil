import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrarContactosPage } from '../registrar-contactos/registrar-contactos';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the ContactosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
  
  correoU: any;
  com: any;
  contactos:any;
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.serviceMoto.getEmail().then((email) => {
      this.correoU = email;
    });
    
  setInterval(()=>{
    this.getContactos();
  },1000); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactosPage'); 
  }
 
  registrar(){
    this.navCtrl.push(RegistrarContactosPage,{correoU:this.correoU});
  }

  getContactos(){
    this.serviceMoto.getContactos(this.correoU).then((con)=>{
      this.contactos = con["data"];
      
      console.log(con)
    });
  }

}
