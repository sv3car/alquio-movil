import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'https://alquio.com/api';

  /*headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true 
  });*/

  header = new HttpHeaders();

  constructor(public http: HttpClient) {
  }

  //POST

  userLog(email: string, password: string) {
    /*this.header.set('Access-Control-Allow-Origin', '*');
    this.header.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/login', {
        "email": email,
        "password": password
      }, {
        headers : this.header
      }).subscribe(res => {
          console.log(res);
          console.log(resolve(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });*/
    let params = {
      email: email,
      password: password
    }
    let headers = new HttpHeaders({"Content-type":"application/json"});
    return this.http.post(this.apiUrl+'/login', params, {headers: headers}).toPromise()
  }


  

  //

  //GET
  get(token, mod) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/' + mod, {params: new HttpParams().set('api_token', token),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getAddParam(token, mod, filter, valueFilter) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/' + mod, {
        params: new HttpParams().set('api_token', token).append(filter,valueFilter)
      },).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getDataUrl(url) {
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
