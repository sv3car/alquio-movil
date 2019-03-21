import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Providers

import { GlobalProvider } from '../global/global';

@Injectable()
export class RestProvider {

  header = new HttpHeaders();

  constructor(public http: HttpClient,
              public globalProv: GlobalProvider) {
  }

  /**
   * 
   * Metodo para el consumo de apis get
   * 
   * @param metodo : string nombre del metodo a consumir
   * 
   */
  getData(metodo, params=""){

    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this.http.get(this.globalProv.apiURL + metodo + params, {headers: headers}).toPromise();
  }

  /**
   * 
   * Metodo para el consumo de apis post
   * 
   * @param metodo : string nombre del metodo a consumir
   * 
   */
  postData(metodo, params=null){
  
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this.http.post(this.globalProv.apiURL + metodo, params, {headers:headers}).toPromise();
  }

  /////////////////////////////
  ////    MIDDLEWARE   ///////
  ////////////////////////////
  
  /**
   * 
   * Metodo para el consumo de apis post desde el middleware
   * 
   * @param metodo : string nombre del metodo a consumir
   * 
   */
  postTestServices(metodo, params=null){
  
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this.http.post("http://localhost:8001/post", params, {headers:headers}).toPromise();
  }
  
  /**
   * 
   * Metodo para el consumo de apis post desde el middleware
   * 
   * @param metodo : string nombre del metodo a consumir
   * 
   */
  getTestServices(metodo, params=null){
  
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this.http.post("http://localhost:8001/get", {params:params, metodo:metodo}, {headers:headers}).toPromise();
  }

}
