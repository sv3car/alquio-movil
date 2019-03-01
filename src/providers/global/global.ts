import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  apiURL: string = 'https://alquio.com/api/';
  loading: any;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController) {
    console.log('Hello GlobalProvider Provider');
  }

  /**
   * 
   * Metodo que crea un Loading y lo retorna
   * 
   */
  crearLoading(){

    this.loading = this.loadingCtrl.create({
      content: "Por favor espere..."
    });

    return this.loading;

  }

}
