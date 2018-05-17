import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the RegistrarContactosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-contactos',
  templateUrl: 'registrar-contactos.html',
})
export class RegistrarContactosPage {
  correoU: any;
  estado: boolean = false;
  private registroContacto: FormGroup;
  constructor(public viewCtrl: ViewController,public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.correoU = navParams.get("correoU");
    this.registroContacto = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      notificar: ['', Validators.required],
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarContactosPage');
  }
  registro(){
    console.log(this.estado)
    this.serviceMoto.registroContacto(this.correoU,this.registroContacto.value.correo,this.registroContacto.value.correo,
      this.registroContacto.value.celular,this.estado).then((registro)=>{

        console.log(registro)

        this.viewCtrl.dismiss(); 

    });
  }

  disponibilidad(estado){
    this.estado = estado.value;
  }

}
