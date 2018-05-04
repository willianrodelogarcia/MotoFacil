import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, TextInput, Searchbar } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { MapUserPage } from '../map-user/map-user';

/**
 * Generated class for the PedirServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-pedir-servicio',
  templateUrl: 'pedir-servicio.html',
})
export class PedirServicioPage {
  @ViewChild('price') input:TextInput; 
  @ViewChild('origen') searchO:Searchbar; 
  query: string = '';
  position: string;
  autocompleteService: any;
  places: any = [];
  placesService: any;
  map: any;
  origen:string;
  precio:number;
  constructor(private geolocation: Geolocation,
    public zone: NgZone, public navCtrl: NavController,
    public navParams: NavParams, public viewCtrl: ViewController) {

      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedirServicioPage');
    //this.autocomplete();
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.miPosicion().subscribe(location=>{
      //this.position=location;
      this.origen = location;
      this.searchO.value= location;
      
     });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  miPosicion() {

    let location = Observable.create(observable => {

      this.geolocation.getCurrentPosition().then((position) => {
        let geocoder = new google.maps.Geocoder();
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ 'location': latLng }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              //console.log(results[0].formatted_address);
              observable.next(results[0].formatted_address);

            } else {
              console.log("fail");
            }
          } else {
            console.log("No OK")
          }
        });

      });
      
    });

    return location;

  }

  latitude: number = 0;
  longitude: number = 0;


  selectPlace(address: any) {
    let geocoder = new google.maps.Geocoder();
    this.query = address;
    this.places = [];
    geocoder.geocode({ 'address': address }, (results, status) => {

      //console.log(results[0].geometry.location);
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.distancia().subscribe(precio=>{
        this.precio = precio;
        this.input.value=precio;
        console.log(this.precio)
      });
      console.log(this.latitude + "," + this.longitude);
    });


  }
  buscar() {
    var service = new google.maps.places.AutocompleteService();
    if (this.query.length > 0) {
      let config = {
        types: ['geocode'],
        componentRestrictions: { country: 'CO' },
        input: this.query,

      }
      service.getQueryPredictions(config, (predictions, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });
    } else {
      this.places = [];
    }

  }


  distancia(){
    let precioApagar = Observable.create(observable => {
      this.geolocation.getCurrentPosition().then((position) => {
     
        
  
       var dato = this.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude,this.latitude,this.longitude);
        
        var precio = parseInt(dato.toFixed(2))*1300;
        observable.next(precio);
        
      });

    });
    return precioApagar;
  }


  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *  Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
   deg2rad(deg) {
    return deg * (Math.PI/180) 
  }


  siguiente(){
    console.log(this.query+" "+this.precio);
    this.navCtrl.push(MapUserPage,{origen:this.origen,destino:this.query,precio:this.precio});
    this.viewCtrl.dismiss();
  }

}
