import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceMotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceMotoProvider {
 
  constructor(public http: HttpClient) {
    console.log('Hello ServiceMotoProvider Provider');
  }

  //https://wrodelogarcia.000webhostapp.com/motofacil/
  //http://localhost/serviceMoto/

  getConductores(){
    return new Promise((resolve)=>{
      this.http.get("https://wrodelogarcia.000webhostapp.com/motofacil/serviceMoto.php?metodo=listarConductores").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  pedirServicio() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&origen=" + "origen" + "&destino=" + "destino" + "&precio=" + "precio" + "&correoU=" + "wrodelo@gmail.com" + "&estado=" + "pedir";
      this.http.post("https://wrodelogarcia.000webhostapp.com/motofacil/serviceMoto.php?metodo=solicitarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
    
  }

  aceptarServicio(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&correoU=" + "wrodelo@gmail.com" + "&estado=" + "aceptar" + "&identificacionC="+ "1143389715";
      this.http.post("https://wrodelogarcia.000webhostapp.com/motofacil/serviceMoto.php?metodo=aceptarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getServicios(){
    return new Promise((resolve)=>{
      this.http.get("https://wrodelogarcia.000webhostapp.com/motofacil/serviceMoto.php?metodo=servicios").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

}
