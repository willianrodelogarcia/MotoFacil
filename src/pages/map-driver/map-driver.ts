import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the MapDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map-driver',
  templateUrl: 'map-driver.html',
})
export class MapDriverPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  servicios: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  esconderCard = true;

  origen:string;
  destino:string;
  precio:string;
  correoU:string;

  constructor(public serviceMoto: ServiceMotoProvider,private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapDriverPage');
    this.loadMap();
    //this.getServicios();
  }

  disponibilidad(evt){
    console.log(evt.checked)
  }


  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        radius: position.coords.accuracy,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setOptions({ suppressMarkers: true });
      /*if (!this.esconderCard) {
        this.calculateAndDisplayRoute(position);
        
      }*/
      let marker = new google.maps.Marker({
        map: this.map,
        title: 'Estas aquí!',
        icon: { url: 'assets/imgs/motorcyclist.png' },
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });


      //this.addMarker(marker);
      /*if (this.conductores !== []) {
        setInterval(() => {
          this.conductores.data.forEach(element => {

            this.addMarker(element);

          });
        }, 1000);
      }*/
      //let content = "<h4>AQUI!</h4>";         

      //this.addInfoWindow(marker, content);

    }, (err) => {
      console.log(err);
    });

  }

  getServicios() {
    setInterval(() => {
      this.serviceMoto.getServicios().then((serv) => {
        console.log(serv["data"][0].estado)
        if (serv["data"][0].estado == "pedir") {
          this.esconderCard = false;

          /*this.servicios = serv;
          
          this.loader.dismiss()

          this.correoU = this.servicios["data"][0].correoU;*/

          this.correoU = serv["data"][0].correoU;
          this.origen = serv["data"][0].origen;
          this.destino = serv["data"][0].destino;
          this.precio = serv["data"][0].precio;

        } else {
          console.log("esperando...")
        }
      });
    }, 1000);
  }

  contacto(){

  }

  aceptarServicio(){
    
  }

  cancelarServicio(){

  }
}
