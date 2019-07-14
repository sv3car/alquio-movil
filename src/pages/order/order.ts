import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { RestProvider } from '../../providers/rest/rest';
import { GlobalProvider } from '../../providers/global/global';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  contentOpacityDisplay: string = 'no-exist-content';

  namePage: any;

  orders : any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public restService: RestProvider,
              public globalProv: GlobalProvider) {
    /**
     * Nombre de la Página
     */
    this.namePage = {
      name: 'order'
    }
  }

  ionViewDidLoad() {
    this.getOrder();
  }

  getOrder(){
   let loading = this.globalProv.crearLoading();
    loading.present();
    this.restService.getData('pedidos', "?api_token="+localStorage.getItem('token')).then(
      (data:any)=>{
        for(let order of data.data){
          this.restService.getData('pedidos', "/" + order.id + "?api_token="+localStorage.getItem('token')).then(
            (data:any)=>{
              let productos : any[] = [];
              let order = data.encabezado;
              for(let prod of data.encabezado.detalles){
                this.restService.getData('productos', "/" + prod.producto_id + "?api_token="+localStorage.getItem('token')).then(
                  (data:any)=>{
                    let product = data;
                    product.cantidad = prod.cantidad;
                    product.name_detalle = prod.name;
                    productos.push(data);
                  },(err)=>{
                    //this.loading.dismiss();
                    console.log("PRODUCTOS ERROR", err);
                  })
              }
              switch(order.estatus){
                case "PENDIENTE":{
                  order.estatus_image = "en-proceso.png";
                  break;
                }
                case "COMPLETADO":{
                  order.estatus_image = "entregado.png";
                  break;
                }
                case "CANCELADO":{
                  order.estatus_image = "cancelado.png";
                  break;
                }
                case "TRANSITO":{
                  order.estatus_image = "en-transito.png";
                }
              }
              
              let d = new Date(order.created_at);
              let dia = d.getDate();
              let mes = d.getMonth();
              let yyy = d.getFullYear();
              let fecha_formateada = dia + '/' + mes + '/' + yyy;

              order.fecha = fecha_formateada;
              order.detalles = productos;
              this.orders.push(order);
            },(err)=>{
              //this.loading.dismiss();
              console.log("PRODUCTOS ERROR", err);
            })
        }
      },(err)=>{
        //this.loading.dismiss();
        console.log("PRODUCTOS ERROR", err);
      }
    );
    loading.dismiss();
  }

  backPage():void{
    this.navCtrl.setRoot(StartPage);
  }

}
