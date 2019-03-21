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
  api_token: string = '';
  loading: any;

  //Drawer
  isDrawer: boolean = false;


  getToken(){
    return this.api_token
  }

  setToken(api_token:any){
    this.api_token = api_token;
  }

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController) {
  }

  /**
   *
   * Getter del drawer
   * 
   */
  getDrawer(){
    return this.isDrawer;
  }

  /**
   * 
   * Setter del drawer
   * 
   * @param isDrawer valor del drawer
   * 
   */
  setDrawer(isDrawer:boolean){
    this.isDrawer = isDrawer;
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

  cartExchage(){
    console.log(!localStorage.getItem('product_cart'));
    console.log(localStorage.getItem('product_cart') === "null");
    return localStorage.getItem('product_cart') === "null";
  }

  existProdCart(product_cart : any[], product : any){
    for (let prod of product_cart){
      console.log("entro");
      console.log(prod);
      if (prod.id == product.id){
        return prod;
      }
    }
    return false;
  }

}
