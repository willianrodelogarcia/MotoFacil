import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the RegistroUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-user',
  templateUrl: 'registro-user.html',
})
export class RegistroUserPage {
  private registroUser: FormGroup;
  constructor(public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.registroUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroUserPage');
  }


  registro(){
    this.serviceMoto.registroUser(this.registroUser.value.nombre,this.registroUser.value.correo,this.registroUser.value.celular).then((data)=>{
      console.log(data)
      //this.navCtrl.setRoot();
    });
    //this.registroUser.value.nombre,this.registroUser.value.correo,this.registroUser.value.celular
  }
  tomarFoto(){
    console.log("Foto")
  }

}
