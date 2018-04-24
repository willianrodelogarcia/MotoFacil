import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  latlng:any;
  conductores:any;
  origen:string;
  destino:string;
  precio:string;
  esconderBoton:boolean=false;
  esconderCard:boolean=true;
  esconderSearch:boolean = false;
  autocomplete = { input: '' };

  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocompleteItems = [];


  
  constructor(public serviceMoto:ServiceMotoProvider,public navCtrl: NavController, 
    public navParams: NavParams,private geolocation: Geolocation,private modalCtrl:ModalController) {
      
  }

  

  ionViewDidLoad() { 

    this.obtenerPosicion().subscribe((position)=>{
      this.latlng = position;
    });

    if(this.navParams.get("origen") == null && this.navParams.get("destino") == null && this.navParams.get("precio") == null){
      this.esconderCard = true;
      this.esconderBoton = false;
      this.esconderSearch = false;
      console.log("Esta vacio")
    }else{
     this.origen = this.navParams.get("origen");
     this.destino = this.navParams.get("destino");
     this.precio = this.navParams.get("precio");
     this.esconderBoton = true;
     this.esconderCard = false;
     this.esconderSearch = true;
      console.log("no esta vacio")
    } 
    this.getConductores();
    
    
    
  }

  getConductores(){ 
    setInterval(()=>{
      this.serviceMoto.getConductores().then((con)=>{
        this.conductores = con;
        console.log(this.conductores);
        
      },(err)=>{
        this.loadMap();
        console.log("err")
      });
    },1000);
    this.loadMap();
  }

  obtenerPosicion(){
    let position = Observable.create(obsevable=>{

      this.geolocation.getCurrentPosition().then((position)=>{
        obsevable.next(position);
      });


    });

    return position;
  }

  loadMap(){

    /*setInterval(()=>{
        
    },1000);*/
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom:15,
        radius: position.coords.accuracy,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        disableDefaultUI:true,
      } 
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      if(!this.esconderCard){
        
        console.log("card escondida")
      }
      

      let marker = new google.maps.Marker({
        map: this.map, 
        title: 'Estas aquí!',
        icon: { url : 'assets/imgs/personyou.png' },
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
      //this.addMarker(marker);
      if(this.conductores!==[]){
        setInterval(()=>{
          this.conductores.data.forEach(element => {
            
            this.addMarker(element);
    
          });
        },1000);
      }
      //let content = "<h4>AQUI!</h4>";         
     
      //this.addInfoWindow(marker, content);
      console.log("finish")
    }, (err) => {
      console.log(err);
    });
 
  }

  calcularRuta(){
  
  }
  /*addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }*/
  
  addMarker(marker){
      
      let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);
 
      let markerOp = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: { url : 'assets/imgs/motorcyclist.png' },
        position: latLng
      });
      markerOp.setAnimation(null);
      setInterval(()=>{
        markerOp.setMap(null);
      },2000); 
      
    
  }


  pedirServicio(){
    let modal = this.modalCtrl.create(PedirServicioPage);
    
    modal.present();
  }


  obtenerDireccionLatLng(address:any){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {

      //console.log(results[0].geometry.location);
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      
      console.log(this.latitude + "," + this.longitude);
    });
  }
  

}
