import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'https://alquio.com/api';

  constructor(public http: HttpClient) {
  }

  //POST

  userLog(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/login', {
        "email": email,
        "password": password
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
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
      }).subscribe(data => {
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
