import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { VehiculoPage } from '../vehiculo/vehiculo';

/**
 * Generated class for the LoginDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-driver',
  templateUrl: 'login-driver.html',
})
export class LoginDriverPage {
  private loginDriver: FormGroup;
  
  constructor(public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.loginDriver = this.formBuilder.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginDriverPage');
  }


  login(){
    this.serviceMoto.loginDriver(this.loginDriver.value.correo,this.loginDriver.value.contraseña).then((data)=>{
      if(data["data"][0] != null){
        if(data["data"][0].estadoCorreo == 1){
          console.log("Correo Activado")
          this.serviceMoto.setEmail(this.loginDriver.value.correo);
          this.navCtrl.setRoot(VehiculoPage);
        }else{
          console.log("Correo no Activado")
        }
      }

    });
  }

}
