import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroUserPage } from '../registro-user/registro-user';
import { LoginUserPage } from '../login-user/login-user';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }


  ingresar(){
    this.navCtrl.push(LoginUserPage); 
  }

  registrar(){
    this.navCtrl.push(RegistroUserPage);
  }

}
