import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { MapUserPage } from '../map-user/map-user';

/**
 * Generated class for the LoginUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
})
export class LoginUserPage { 
  private loginUser: FormGroup;
  constructor(public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.loginUser = this.formBuilder.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginUserPage');
  }

  login(){
    this.serviceMoto.loginUser(this.loginUser.value.correo,this.loginUser.value.contraseña).then((data)=>{
      if(data["data"][0] != null){
        this.serviceMoto.setEmail(this.loginUser.value.correo);
        if(data["data"][0].estadoCorreo == 1){
          console.log("Correo Activado")
          this.navCtrl.setRoot(MapUserPage);
        }else{
          console.log("Correo no Activado")
        }
      }

    });
  }

}
