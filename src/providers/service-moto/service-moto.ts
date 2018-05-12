import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ServiceMotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceMotoProvider {
 
  constructor(private storage: Storage,public http: HttpClient) {
    console.log('Hello ServiceMotoProvider Provider');
  }

  //https://wrodelogarcia.000webhostapp.com/motofacil/
  //http://localhost/serviceMoto/

  getConductores(){
    return new Promise((resolve)=>{
      this.http.get("http://localhost/serviceMoto/serviceMoto.php?metodo=listarConductores").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  pedirServicio(origen, destino, precio, correo) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&origen=" + origen + "&destino=" + destino + "&precio=" + precio + "&correoU=" + correo + "&estado=" + "pedir";
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=solicitarServicio", params, httpOptions).subscribe((data)=>{
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
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=aceptarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getServicios(){
    return new Promise((resolve)=>{
      this.http.get("http://localhost/serviceMoto/serviceMoto.php?metodo=servicios").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }


  registroDriver(nombre,identificacion,correo,celular,placa){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&nombre=" + nombre + "&identificacion=" + identificacion + "&correo="+ correo + "&celular="+ celular + "&placa="+ placa;
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=registroDriver", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  registroUser(nombre,correo,celular){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&nombre=" + nombre + "&correo="+ correo + "&celular="+ celular;
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=registroUser", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }


  loginDriver(correo,password){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo + "&password=" + password;
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=login", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  loginUser(correo,password){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo + "&password=" + password;
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=loginUser", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getMotos(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&placa=" + "xsdr" ;
      this.http.post("http://localhost/serviceMoto/serviceMoto.php?metodo=motos", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  setEmail(email) {
    this.storage.set('email', email);
  }

  getEmail() {
    return this.storage.get('email');
  }

  removeEmail() {
    this.storage.remove('email').then(() => {
      console.log('email is removed');
    });
  }

}
