
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapUserPage } from '../map-user/map-user';
import { MapDriverPage } from '../map-driver/map-driver';
import { UserPage } from '../user/user';
import { DriverPage } from '../driver/driver';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  usuario(){
    this.serviceMoto.getEmail().then((email)=>{
      if(email){
        console.log(email)
      }else{
        this.navCtrl.setRoot(UserPage);
      }
    });
    
  }

  conductor(){
    this.navCtrl.setRoot(DriverPage);
  }

}
