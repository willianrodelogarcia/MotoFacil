import { HttpClient } from '@angular/common/http';
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


  getConductores(){
    return new Promise((resolve)=>{
      this.http.get("http://localhost/serviceMoto/serviceMoto.php?metodo=listarConductores").subscribe((data)=>{
        resolve(data);
      },(err)=>{
        console.log(err);
      });
    });
  }

}
