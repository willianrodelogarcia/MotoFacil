import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var google;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @ViewChild('map') mapElement: ElementRef;
  text: string;
  
  map:any;
 
  constructor(private geolocation: Geolocation,public loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
    //this.map =this.createMap();

    /*this.getCurrentLocation().subscribe(location=>{
     this.centerLocation(location);
    });*/

    this.loadMap();
  }



  getCurrentLocation(){

   let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });

    loader.present();
    console.log("fuera del Current") 
    //let options = {timeout:1000, enableHighAccuracy:true}; 
    let optionObs = Observable.create(observable=>{

      this.geolocation.getCurrentPosition().then((resp)=>{
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
  
        let location = new google.maps.LatLng(lat, lng);
        

        observable.next(location);  

        loader.dismiss();
        console.log("Observable") 
      }).catch((error) => {
        console.log('Error getting location', error);
        loader.dismiss();
        console.log("fuera") 
      });
      
      
    });

    return optionObs; 
  }

  createMap(){
    let location = new google.maps.LatLng(40.712784,-74.005942);
    let mapOptions = {
      center: location,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true,
      //streetViewControl:false
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);
    
    return map;
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  centerLocation(location){

    if(location){
      this.map.panTo(location);
      console.log("if location")
    }else{
      this.getCurrentLocation().subscribe(currentLocation=>{
        this.map.panTo(currentLocation);
        console.log("else currentLocation")
      });
      
    }

  }

}
