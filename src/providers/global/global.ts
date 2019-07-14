import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CometChat, User, Message } from '@cometchat-pro/chat';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class GlobalProvider {
  static VERSION : string = "Versión 1.0";
  static CART_LOCAL : string = "cart_local";
  static FAVORITE_LOCAL : string = "favorite_local";
  static USER_LOCAL : string = "user_local";
  static NOTIFICACIONES_LOCAL : string = "notificaciones_local";
  static CALIDADIMAGEN_LOCAL : string = "calidadimagen_local";
  static API_KEY_CHAT : string = "9cdcfbaecd7f66f4a6a944ac87adee20d21501ef";
  static APP_ID_CHAT : string = "4834554758acef";
  static USER_PROPERTY_TO_BACK_PROPERTY = {
    'Usuario': 'name',
    'Nombre': 'nombre',
    'E-mail': 'email',
    'Dirección de envío': 'direccion'
  };
  static NOTIFICATIONS = {
    Ordenes: true,
    Promociones: false,
    Notificaciones: true
  };
  static CALIDADIMAGEN : string = "Calidad inteligente";


  apiURL: string = 'https://alquio.com/api/';
  apiChat: string = 'https://api.cometchat.com/v1.8/';
  api_token: string = '';
  loading: any;
  alertConfirm: any;
  toast: any

  //Drawer
  isDrawer: boolean = false;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  getToken(){
    return this.api_token
  }

  setToken(api_token:any){

    this.api_token = api_token;
  }

  /**
   * Metodo que determina si es el primer inicio de la app
   */
  isTutorial(){
    if (localStorage.getItem('tuto')){
      return false;
    } else {
      localStorage.setItem('tuto', 'true');
      return true;
    }
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

  /**
   *
   * Metodo que crea un alertConfirm y lo retorna
   *
   */
  crearConfirm(titulo:string, contenido:string, handlerAceptar:any, handlerCancelar:any){
    this.alertConfirm = this.alertCtrl.create({
      title: titulo,
      message: contenido,
      buttons: [
        {
          text: 'Aceptar',
          handler: handlerAceptar
          /*() => {
            console.log('Disagree clicked');
          }*/
        },
        {
          text: 'Cancelar',
          handler: handlerCancelar
          /*() => {
            console.log('Agree clicked');
          }*/
        }
      ]
    });
    return this.alertConfirm;
  }

  /**
   *
   * Metodo que crea un alert y lo retorna
   *
   * @param titulo string : titulo del alert pop up
   *
   * @param contenido string: contenido del alert pop up
   *
   * @param buttons array : opcional => de botones a mostrar.
   *
   */
  crearAlert(titulo:string, 
              contenido:string, 
              buttons: any = [
                {
                  text: 'Aceptar',
                  handler: null
                }
              ]) {
    this.alertConfirm = this.alertCtrl.create({
      title: titulo,
      message: contenido,
      buttons: buttons
    });
    return this.alertConfirm;
  }

  showToast(mensaje:string ,position: string) {
    this.toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: position,
      cssClass: 'customToastClass'
    });
    return this.toast;
  }

  /**
   * Método que retorna el id de un
   * elemento de un array segun su indice
   *
   * @param array
   * @param indexCat
   */
  getArrayIdByIndex(array:any, index:number):number{
    return array.find((element:any, ind: number) => {
      return ind == index;
    }).id;
  }

  /**
   * Método que retorna el índice de un
   * elemento de un array segun su id
   *
   * @param array
   * @param id
   */
  getArrayIndexById(array:any, id:number):number{
    return array.findIndex((element:any) => {
      return element.id == id;
    });
  }

  /**
   * Remueve un elemento de un array
   * segun el id que se le pase del elemento
   *
   * retorna el array luego de ser eliminado el elemento,
   * si el array quedó vacío, devuelve null
   *
   * @param array
   * @param id
   */
  removeElementArrayById(array:any, id:number):any{
    let elemene_index = this.getArrayIndexById(array, id);
    array.splice(elemene_index, 1);
    if (array.length == 0){
      return null;
    }
    return array;
  }

  getJSONLocalStorage(nameArray:string):any{
    return JSON.parse(localStorage.getItem(nameArray));
  }

  setJSONLocalStorage(nameArray:string, array:any){
    localStorage.setItem(nameArray, JSON.stringify(array));
  }

  addElementToJSONOfLocalStorage(nameArray:string, element:any){
    let array: any[] = this.getJSONLocalStorage(nameArray);
    if (!array){
      array = [];
    }
    array.push(element);
    this.setJSONLocalStorage(nameArray,array);
  }

  removeElementToJSONOfLocalStorageById(nameArray:string, id:number){
    let array: any[] = this.getJSONLocalStorage(nameArray);
    array = this.removeElementArrayById(array, id);
    this.setJSONLocalStorage(nameArray, array);
  }

  isElementLocalStorageById(nameArray:string, id:number){
    let array: any[] = this.getJSONLocalStorage(nameArray);
    if (!array){
      return false;
    } else if (array.find((element:any) => {return element.id == id;})){
      return true;
    } else {
      return false;
    }
  }

}
