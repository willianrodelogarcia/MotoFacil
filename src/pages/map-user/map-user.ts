import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { PedirServicioPage } from '../pedir-servicio/pedir-servicio';

/**
 * Generated class for the MapUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-user',
  templateUrl: 'map-user.html',
})
export class MapUserPage {
  longitude: any;
  latitude: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latlng: any;
  conductores: any;
  servicios: any;
  origen: string;
  destino: string;
  precio: string;
  esconderBoton: boolean = false;
  esconderCard: boolean = true;
  esconderCard2: boolean = true;
  esconderSearch: boolean = false;
  autocomplete = { input: '' };
  correo:string = "wrodelo@gmail.com";
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocompleteItems = [];

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  loader: any;
  constructor(public loadingCtrl: LoadingController, public serviceMoto: ServiceMotoProvider, public navCtrl: NavController,
    public navParams: NavParams, private geolocation: Geolocation, private modalCtrl: ModalController) {

  }

  posicion(latlng) {
    this.latlng = latlng;

  }

  ionViewDidLoad() {

    this.obtenerPosicion().subscribe((position) => {

      this.posicion(position);

    });



    if (this.navParams.get("origen") == null && this.navParams.get("destino") == null && this.navParams.get("precio") == null) {
      this.esconderCard = true;
      this.esconderCard2 = true;
      this.esconderBoton = false;
      this.esconderSearch = false;
      console.log("Esta vacio")
    } else {
      this.origen = this.navParams.get("origen");
      this.destino = this.navParams.get("destino");
      this.obtenerDireccionLatLng(this.destino);
      this.precio = this.navParams.get("precio");
      this.esconderBoton = true;
      this.esconderCard = false;
      this.esconderCard2 = true;
      this.esconderSearch = true;
      console.log("no esta vacio")
    }
    this.getConductores();

    

  }

  getConductores() {
    setInterval(() => {
      this.serviceMoto.getConductores().then((con) => {
        this.conductores = con;
        //console.log(this.conductores);

      }, (err) => {
        this.loadMap();
        console.log("err")
      });
    }, 1000);
    this.loadMap();

  }

  obtenerPosicion() {
    let position = Observable.create(obsevable => {

      this.geolocation.getCurrentPosition().then((position) => {
        obsevable.next(position);
      });


    });

    return position;
  }

  loadMap() {

    /*setInterval(()=>{
        
    },1000);*/
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
      if (!this.esconderCard) {
        this.calculateAndDisplayRoute(position);
        
      }


      let marker = new google.maps.Marker({
        map: this.map,
        title: 'Estas aquí!',
        icon: { url: 'assets/imgs/personyou.png' },
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });


      //this.addMarker(marker);
      if (this.conductores !== []) {
        setInterval(() => {
          this.conductores.data.forEach(element => {

            this.addMarker(element);

          });
        }, 1000);
      }
      //let content = "<h4>AQUI!</h4>";         

      //this.addInfoWindow(marker, content);
      
    }, (err) => {
      console.log(err);
    });

  }


  calculateAndDisplayRoute(position) {

    this.directionsService.route({
      origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      destination: new google.maps.LatLng(this.latitude, this.longitude),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });


    let markerD = {
      latitude: this.latitude,
      longitude: this.longitude
    };

    //this.addMarkerP(markerO);
    this.addMarkerP(markerD);
  }
  /*addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }*/

  addMarker(marker) {

    let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);

    let markerOp = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: { url: 'assets/imgs/motorcyclist.png' },
      position: latLng
    });
    markerOp.setAnimation(null);
    setInterval(() => {
      markerOp.setMap(null);
    }, 2000);


  }
  addMarkerP(marker) {

    let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);

    let markerOp = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: { url: 'assets/imgs/personyou.png' },
      position: latLng
    });
    markerOp.setAnimation(null);
    /*setInterval(()=>{
      markerOp.setMap(null);
    },2000); */


  }


  pedirServicio() {
    let modal = this.modalCtrl.create(PedirServicioPage);

    modal.present();
  }


  obtenerDireccionLatLng(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {

      //console.log(results[0].geometry.location);
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();

      console.log(this.latitude + "," + this.longitude);
    });
  }

  correoU:string;
  solicitarServicio() {
    this.servicios = [];
    this.loader = this.loadingCtrl.create({
      content: "Buscando..."
    });
    this.serviceMoto.pedirServicio(this.origen,this.destino,this.precio,this.correo).then((data) => {
      console.log(data["data"][0])
      if (data["data"][0] == "peticion_OK") {
        this.loader.present();
        this.esconderCard = true;
        setInterval(() => {
          this.serviceMoto.getServicios().then((serv) => {
            console.log(serv["data"][0].estado)
            if (serv["data"][0].estado == "aceptar") {
              this.servicios = serv;
              this.esconderCard2 = false;
              this.loader.dismiss()
              
             this.correoU = this.servicios["data"][0].correoU;

            } else {
              console.log("esperando...")
            }
          });
        }, 1000);
      }
      
    });



  }

}
