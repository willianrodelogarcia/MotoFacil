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
  //https://wrodelogarcia.000webhostapp.com/motofacil/
  //http://localhost/serviceMoto/
  //https://snuff-apportionment.000webhostapp.com/motofacil/

  web:string = "http://motofacil.webcindario.com/motofacil/";
  
  constructor(private storage: Storage,public http: HttpClient) {
    console.log('Hello ServiceMotoProvider Provider');
  }

  getConductores(){ 
    return new Promise((resolve)=>{
      this.http.get(this.web+"serviceMoto.php?metodo=listarConductores").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getContactos(correoU){
    //obtenerContactos
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&correoU=" + correoU;
      this.http.post(this.web+"serviceMoto.php?metodo=obtenerContactos", params, httpOptions).subscribe((data)=>{
        post(data);
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
      this.http.post(this.web+"serviceMoto.php?metodo=solicitarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
    
  }

  aceptarServicio(correoU,identificacionC,estado){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&correoU=" + correoU + "&estado=" + estado + "&identificacionC="+ identificacionC;
      this.http.post(this.web+"serviceMoto.php?metodo=aceptarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  cancelarServicio(correoU){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&correoU=" + correoU;
      this.http.post(this.web+"serviceMoto.php?metodo=cancelarServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  elimiarRazonCancelacion(correoU){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams();
    return new Promise((post)=>{
      let params = "&correoU=" + correoU;
      this.http.post(this.web+"serviceMoto.php?metodo=elimiarRazonCancelacion", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getServicios(){
    return new Promise((resolve)=>{
      this.http.get(this.web+"serviceMoto.php?metodo=servicios").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getServicioU(correo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoU=" + correo;
      this.http.post(this.web+"serviceMoto.php?metodo=servicioU", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  
  getCancelaU(correo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoU=" + correo;
      this.http.post(this.web+"serviceMoto.php?metodo=cancelaU", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  calificar(correo,idC,pago,star){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoU=" + correo +"&identificacionC="+ idC +"&pago="+ pago +"&star="+ star;
      this.http.post(this.web+"serviceMoto.php?metodo=calificar", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  getCancelaC(correo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoC=" + correo;
      this.http.post(this.web+"serviceMoto.php?metodo=cancelaC", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  cancelaC(correoU,correo,r){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoC=" + correo +"&razon="+r+"&correoU="+correoU;
      this.http.post(this.web+"serviceMoto.php?metodo=cancelaCond", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  cancelaU(correoU,correo,r){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoC=" + correo +"&razon="+r+"&correoU="+correoU;
      this.http.post(this.web+"serviceMoto.php?metodo=cancelaUser", params, httpOptions).subscribe((data)=>{
        post(data);
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
      this.http.post(this.web+"serviceMoto.php?metodo=registroDriver", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  registroUser(nombre,correo,celular,foto){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&nombre=" + nombre + "&correo="+ correo + "&celular="+ celular+ "&foto="+ foto;
      this.http.post(this.web+"serviceMoto.php?metodo=registroUser", params, httpOptions).subscribe((data)=>{
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
      this.http.post(this.web+"serviceMoto.php?metodo=login", params, httpOptions).subscribe((data)=>{
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
      this.http.post(this.web+"serviceMoto.php?metodo=loginUser", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getMotos(correo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo ;
      this.http.post(this.web+"serviceMoto.php?metodo=motos", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getConductoresEmail(correo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo ;
      this.http.post(this.web+"serviceMoto.php?metodo=conductorEmail", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }
  getUsuarioEmail(correoU){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoU=" + correoU ;
      this.http.post(this.web+"serviceMoto.php?metodo=usuario", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getConductoresId(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&identificacion=" + id ;
      this.http.post(this.web+"serviceMoto.php?metodo=conductorId", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  cambiarEstado(correo,estadoC){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo + "&estadoC=" +estadoC;
      this.http.post(this.web+"serviceMoto.php?metodo=cambiarEstadoC", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }


  cambiarEstadoServicio(correoU,estado){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }; 

    let options = new HttpParams();   
    return new Promise((post)=>{
      let params = "&correoU=" + correoU + "&estado=" +estado;
      this.http.post(this.web+"serviceMoto.php?metodo=cambiarEstadoServicio", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{ 
        console.log(err);
      });
    });
  }

  posicionActual(correo,lat,lng){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correo=" + correo + "&lat="+ lat + "&lng="+ lng;
      this.http.post(this.web+"serviceMoto.php?metodo=posicionActual", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  registroContacto(correoU,nombre,correo,celular,notificar){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoU="+ correoU + "&nombre="+ nombre +"&correo=" + correo + "&celular="+ celular + "&notificar="+ notificar;
      this.http.post(this.web+"serviceMoto.php?metodo=registrarConctacto", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  getGananciasCalificaciones(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&identificacionC=" + id ;
      this.http.post(this.web+"serviceMoto.php?metodo=gananciasCalificaciones", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  registroMoto(correoC,placaM,fotoC,fotoLIzq,fotoLDer,fotoFIzq,fotoFDer){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let options = new HttpParams(); 
    return new Promise((post)=>{
      let params = "&correoC="+ correoC + "&placaM="+ placaM +"&fotoC=" + fotoC + "&fotoLDer="+ fotoLDer + "&fotoFIzq="+ fotoFIzq+ "&fotoFDer="+ fotoFDer+ "&fotoLIzq="+ fotoLIzq;
      this.http.post(this.web+"serviceMoto.php?metodo=registoMotos", params, httpOptions).subscribe((data)=>{
        post(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

  sendNotification(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Basic MThjMzg3MzYtZjVmYi00ZWI3LWJlZGEtMzNkMGUzMjQxNDVi'
      })
    };
    let notificationObj = {
      app_id: "5f4cf235-8b4c-430b-9575-0cd1ddd6d11d",
      //Authorization: "Basic MThjMzg3MzYtZjVmYi00ZWI3LWJlZGEtMzNkMGUzMjQxNDVi",
      contents: { en: "Un Usuario esta pidiendo un Servicio" },
      //include_player_ids: [ids.userId],
      included_segments: ["All"],
      
      filters: [
        {"field": "tag", "key": "userRoll", "relation": "=", "value": "conductor"}
      ]
    };
    window["plugins"].OneSignal.getIds(function (ids) {
      
      
    });
    return new Promise((post)=>{
      
      this.http.post("https://onesignal.com/api/v1/notifications",notificationObj, httpOptions).subscribe((data)=>{
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

  setInfoMoto(estado){
    this.storage.set('infoMoto',estado);
  }

  
}
