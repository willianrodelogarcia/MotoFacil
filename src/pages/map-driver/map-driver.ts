import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';
import { CancelarServicioDriverPage } from '../cancelar-servicio-driver/cancelar-servicio-driver';
import { HomePage } from '../home/home';

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
  celularU: any;
  fotoU: any;
  nombreU: any;
  ganancia: any;
  razon: any;
  esconderCard1: boolean = true;
  esconderCardUser: boolean = true;
  esconderBotton1: boolean = true;
  esconderBotton2: boolean = false;
  esconderBotton3: boolean = true;
  esconderBotton4: boolean = true;
  longitudeDestino: any;
  latitudeDestino: any;
  longitudeOrigen: any;
  latitudeOrigen: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  servicios: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  esconderCard = true;
  esconderCard2 = true;
  origen:string;
  destino:string;
  precio:string;
  correoU:string;
  correoC:string;
  estadoC:boolean;
  rate:any;
  identificacionC:string;
  constructor(public serviceMoto: ServiceMotoProvider,private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    setInterval(()=>{
      this.cargarPosicion();
    },3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapDriverPage');
    this.serviceMoto.getEmail().then((email)=>{
      this.correoC = email;

      this.serviceMoto.getConductoresEmail(this.correoC).then((datos)=>{
        console.log(datos["data"])
        this.identificacionC = datos["data"][0].identificacion;
        if(datos["data"][0].estadoC == "1"){
          this.estadoC = true;
          
        }else{
          this.estadoC = false;
        }
       
      });
    });
    this.loadMap();
    this.getServicios();
  }

  disponibilidad(evt){
    console.log(evt.checked)
    if(!evt.checked){
        console.log("No disponible")
        this.serviceMoto.cambiarEstado(this.correoC,0).then((peticion)=>{
            console.log(peticion)
        });
    }else{
      this.serviceMoto.cambiarEstado(this.correoC,1).then((peticion)=>{
        console.log(peticion)
    });
    }
    //cambiar estado
  }

  cargarPosicion(){
    this.geolocation.getCurrentPosition().then((position)=>{

      if(this.esconderCard){
        
        if((position.coords.latitude === this.latitudeOrigen) && (position.coords.longitude === this.longitudeOrigen)){
          console.log("Estoy donde esta el Usuario")
          this.esconderBotton3 = false;
          this.esconderBotton1 = true;
          this.esconderBotton2 = true;
          this.esconderBotton4 = true;
        }else{
          console.log("Voy en camino")
        }
      }else{
        console.log("Card No Escondido")
      }


      if((position.coords.latitude === this.latitudeDestino) && (position.coords.longitude === this.longitudeDestino)){
        
        this.esconderBotton1 = true;
        this.esconderBotton2 = true;
        this.esconderBotton3 = true;
        this.esconderBotton4 = false;
        console.log("Llegamos al destino")
      }
     

      this.serviceMoto.posicionActual(this.correoC,position.coords.latitude, position.coords.longitude).then((peticion)=>{
        console.log(peticion)
      });
    });
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

  calculateAndDisplayRoute() {
    console.log("Origen "+this.latitudeOrigen+" "+this.longitudeOrigen)
    console.log("Destino "+this.latitudeDestino+" "+this.longitudeDestino)
    this.directionsService.route({
      origin: new google.maps.LatLng(this.latitudeOrigen, this.longitudeOrigen),
      destination: new google.maps.LatLng(this.latitudeDestino, this.longitudeDestino),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });

    let markerO = {
      latitude: this.latitudeOrigen,
      longitude: this.longitudeOrigen
    };

    let markerD = {
      latitude: this.latitudeDestino,
      longitude: this.longitudeDestino
    };

    this.addMarkerP(markerO);
    this.addMarkerP(markerD);
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

  getServicios() {
    setInterval(() => {
      this.serviceMoto.getServicios().then((serv) => {
        console.log(serv["data"])
        if(serv["data"].length > 0){
        if (serv["data"][0].estado == "pedir") {
          this.esconderCard = false;
          this.esconderBotton2 = true; 
          this.esconderCard1 = true;
          /*this.servicios = serv;
          
          this.loader.dismiss()

          this.correoU = this.servicios["data"][0].correoU;*/

          this.correoU = serv["data"][0].correoU;
          this.origen = serv["data"][0].origen;
          //this.obtenerDireccionOrigenLatLng(this.origen);
          this.destino = serv["data"][0].destino;
          //this.obtenerDireccionDestinoLatLng(this.destino);
          this.precio = serv["data"][0].precio;

        } else {
          console.log("esperando...")
        }

        if(serv["data"][0].estado == "cancelarU"){
          this.esconderCard1 = false;
          this.esconderCard = true;
          this.esconderBotton1 = true;
          this.esconderBotton2 = true;
          this.esconderBotton3 = true;
          this.esconderBotton4 = true;
          this.serviceMoto.getCancelaU(this.correoU).then((cancela)=>{
            this.razon = cancela["data"][0].razonU;
          });
        }
      }else{
        console.log("vacio")
      }
      });
    }, 1000);
  }

  contacto(){
    this.esconderCardUser = false;
    this.esconderBotton1 = true;
    this.serviceMoto.getUsuarioEmail(this.correoU).then((usuario)=>{
      this.nombreU = usuario["data"][0].nombre;
      this.fotoU = usuario["data"][0].foto;
      this.celularU = usuario["data"][0].celular;
    });
  }

  cerrarCon(){
    this.esconderCardUser = true;
    this.esconderBotton1 = false;
  }

  aceptarServicio(){
    console.log(this.correoU+" "+this.correoC+" "+this.identificacionC)
    this.esconderCard = true;
     this.obtenerDireccionOrigenLatLng(this.origen);
     this.obtenerDireccionDestinoLatLng(this.destino);
     this.serviceMoto.aceptarServicio(this.correoU,this.identificacionC,"aceptar").then((peticion)=>{
      console.log(peticion["data"])
      this.calculateAndDisplayRoute();
      this.esconderBotton1 = false;
      this.esconderCard = true;
     });
  }

  eliminarPeticion(){
    this.serviceMoto.cancelarServicio(this.correoU).then((peticion)=>{
      console.log(peticion)
      this.navCtrl.setRoot(MapDriverPage);
    });
    this.serviceMoto.elimiarRazonCancelacion(this.correoU).then((razon)=>{
      console.log(razon)
    });
  }

  cancelarServicio(){
    /*this.serviceMoto.cancelarServicio(this.correoU).then((peticion)=>{
      console.log(peticion)
    });*/

    this.navCtrl.push(CancelarServicioDriverPage,{correoC:this.correoC,correoU:this.correoU,identificacionC:this.identificacionC});
  }

  obtenerDireccionOrigenLatLng(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {

      //console.log(results[0].geometry.location);
      this.latitudeOrigen = results[0].geometry.location.lat();
      this.longitudeOrigen = results[0].geometry.location.lng();

      
    });
  }
  obtenerDireccionDestinoLatLng(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {

      //console.log(results[0].geometry.location);
      this.latitudeDestino = results[0].geometry.location.lat();
      this.longitudeDestino = results[0].geometry.location.lng();

      
    });

    
  }

  ganancias(){
      this.esconderBotton2 = true;
      this.esconderCard2 = false;
      console.log(this.identificacionC);
      this.serviceMoto.getGananciasCalificaciones(this.identificacionC).then((gc)=>{
        console.log(gc)
        this.rate = gc["data"][0].PROMEDIO;
        this.ganancia = gc["data"][0].TOTALCOBRADO;
      });

  }

  cerrar(){
    this.esconderBotton2 = false;
    this.esconderCard2 = true;
  }

  calificacion(){
    
  }

  iniciarViaje(){
    this.serviceMoto.aceptarServicio(this.correoU,this.identificacionC,"iniciar").then((peticion)=>{
      console.log(peticion["data"])
      this.esconderBotton1 = true;
      this.esconderBotton2 = true;
      this.esconderBotton3 = true;
      this.esconderBotton4 = false;
     });
  }

  terminarViaje(){
    this.serviceMoto.aceptarServicio(this.correoU,this.identificacionC,"terminar").then((peticion)=>{
      console.log(peticion["data"])
      this.esconderBotton1 = true;
      this.esconderBotton2 = false;
      this.esconderBotton3 = true;
      this.esconderBotton4 = true;  
     });
  }

  salir() {
    this.serviceMoto.removeEmail();
    this.navCtrl.setRoot(HomePage);
  }
}
