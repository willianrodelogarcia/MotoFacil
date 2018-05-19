import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { InicioDriverPage } from '../inicio-driver/inicio-driver';

/**
 * Generated class for the RegistroDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-driver',
  templateUrl: 'registro-driver.html',
})
export class RegistroDriverPage {
  private registroDriver: FormGroup;
  constructor(public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.registroDriver = this.formBuilder.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      placa: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroDriverPage');
  }

  registro(){
    
      this.serviceMoto.registroDriver(this.registroDriver.value.nombre,this.registroDriver.value.identificacion,
        this.registroDriver.value.correo,this.registroDriver.value.celular,this.registroDriver.value.placa).then((data)=>{
        console.log(data)
        this.navCtrl.setRoot(InicioDriverPage);
      });
  }

  

}
