import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { PedirServicioPage } from '../pedir-servicio/pedir-servicio';
import { HomePage } from '../home/home';
import { RegistrarContactosPage } from '../registrar-contactos/registrar-contactos';
import { ContactosPage } from '../contactos/contactos';
import { CancelarServicioUserPage } from '../cancelar-servicio-user/cancelar-servicio-user';

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
  idC: any;
  correoC: any;
  razon: any;
  nombreCond: any;
  imageConductor: any;
  longitude: any;
  latitude: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latlng: any;
  conductores: any = [];
  servicios: any;
  origen: string;
  destino: string;
  precio: string;
  esconderBoton: boolean = false;
  esconderCard: boolean = true;
  esconderCard2: boolean = true;
  esconderCard3: boolean = true;
  esconderCard4: boolean = true;
  esconderSearch: boolean = false;
  autocomplete = { input: '' };
  correo: string;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocompleteItems = [];

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  loader: any;
  constructor(public loadingCtrl: LoadingController, public serviceMoto: ServiceMotoProvider, public navCtrl: NavController,
    public navParams: NavParams, private geolocation: Geolocation, private modalCtrl: ModalController) {

    this.serviceMoto.getEmail().then((email) => {
      this.correo = email;
    });


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
    /*setInterval(() => {
      this.getConductores();
    }, 1000);*/
    this.loadMap();

  }

  getConductores() {

    this.serviceMoto.getConductores().then((con) => {
      if(con["data"][0] != [ ]){
        if(con["data"][0].estadoC === "1"){
          this.conductores = con;
          this.conductores.data.forEach(element => {
  
            this.addMarker(element);
  
           });
        }
      } 
      //console.log(this.conductores);

    }, (err) => {
      this.loadMap();
      console.log("err")
    });



  }

  obtenerPosicion() {
    let position = Observable.create(obsevable => {

      this.geolocation.getCurrentPosition().then((position) => {
        obsevable.next(position);
      });


    });

    return position;
  }

  registrar(){
    this.navCtrl.push(ContactosPage,{correoU:this.correo});
  }

  loadMap() {

    /*setInterval(()=>{

    },1000);*/

    setInterval(() => {
      this.getConductores();
    }, 1000);
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
        /*setInterval(() => {
          this.conductores.data.forEach(element => {

           this.addMarker(element);

          });
        }, 1000);*/
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

  correoU: string;
  solicitarServicio() {
    this.servicios = [];
    this.loader = this.loadingCtrl.create({
      content: "Buscando..."
    });
    this.serviceMoto.pedirServicio(this.origen, this.destino, this.precio, this.correo).then((data) => {
      console.log(data)
      if (data["data"] === "peticion_OK") {
        this.loader.present();
        this.esconderCard = true;
        //this.sendNotificationConductor();
        this.serviceMoto.sendNotification().then((data)=>{
          
        },(failedResponse)=>{
          console.log("Notification Post Failed: ", failedResponse);
          alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        });
        setInterval(() => {
          this.serviceMoto.getServicioU(this.correo).then((serv) => {
            console.log(serv)
            if(serv["data"].length > 0){
              console.log(serv["data"][0].estado)
              if (serv["data"][0].estado == "aceptar") {
                this.servicios = serv;
                this.esconderCard2 = false;
                this.loader.dismiss();
  
                this.origen = this.servicios["data"][0].origen;
                this.destino = this.servicios["data"][0].destino;
                this.precio = this.servicios["data"][0].precio;
                console.log("ID " + this.servicios["data"][0].identificacionC);
                this.idC = this.servicios["data"][0].identificacionC;
                this.serviceMoto.getConductoresId(this.servicios["data"][0].identificacionC).then((condu) => {
                  this.nombreCond = condu["data"][0].nombre;
                  this.correoC = condu["data"][0].correo;
                  this.serviceMoto.getMotos(condu["data"][0].correo).then((data) => {
                    console.log(data["data"])
  
                    this.imageConductor = data["data"][0].fotoConductor;
                  });
  
                });
  
              } else {
                console.log("esperando...")
                //this.navCtrl.setRoot(MapUserPage);
              }
              if (serv["data"][0].estado == "terminar") {
                this.esconderCard2 = true;
                this.esconderCard3 = false;
              }
  
              if(serv["data"][0].estado == "cancelarC"){
                this.esconderCard4 = false;
                this.esconderCard2 = true;
                this.serviceMoto.getCancelaC(this.correoC).then((cancela)=>{
                  this.razon = cancela["data"][0].razonC;
                });
              }
            }else{
            
            }

            
          });
        }, 1000);
      }

    });

  }

  cancelarServicio(){
    this.navCtrl.push(CancelarServicioUserPage,{correoC:this.correoC,correoU:this.correo});
  }

  eliminarPeticion(){
    this.serviceMoto.cancelarServicio(this.correo).then((peticion)=>{
      console.log(peticion)
      this.navCtrl.setRoot(MapUserPage);
    });
    this.serviceMoto.elimiarRazonCancelacion(this.correo).then((razon)=>{
      console.log(razon)
    });
  }
  star:number;
  onModelChange(star) {
    console.log(star)
    this.star = star;
  }

  calificar(){
    console.log("CALIFICAR")
    this.serviceMoto.calificar(this.correo,this.idC,this.precio,this.star).then((peticion)=>{
      console.log(peticion)
      this.serviceMoto.cancelarServicio(this.correo).then(()=>{
        this.navCtrl.setRoot(MapUserPage);
      });
    });
  }
  salir() {
    this.serviceMoto.removeEmail();
    this.navCtrl.setRoot(HomePage);
  }



  sendNotificationConductor() {
    window["plugins"].OneSignal.getIds(function (ids) {

      var notificationObj = {
        app_id: "5f4cf235-8b4c-430b-9575-0cd1ddd6d11d",
        //Authorization: "Basic MThjMzg3MzYtZjVmYi00ZWI3LWJlZGEtMzNkMGUzMjQxNDVi",
        contents: { en: "Un Usuario esta pidiendo un Servicio" },
        include_player_ids: [ids.userId],
        included_segments: ["All"],
        
        filters: [
          {"field": "tag", "key": "userRoll", "relation": "=", "value": "conductor"}
        ]
      };
      
      

      window["plugins"].OneSignal.postNotification(notificationObj,
        function (successResponse) {
          console.log("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
          console.log("Notification Post Failed: ", failedResponse);
          alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
    });
  }

}
