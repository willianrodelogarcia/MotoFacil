
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapUserPage } from '../map-user/map-user';
import { MapDriverPage } from '../map-driver/map-driver';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  usuario(){
    this.navCtrl.setRoot(MapUserPage);
  }

  conductor(){
    this.navCtrl.setRoot(MapDriverPage);
  }

}
