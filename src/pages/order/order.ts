import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { RestProvider } from '../../providers/rest/rest';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  contentOpacityDisplay: string = 'no-exist-content';

  loading: any;

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
    this.loading = this.globalProv.crearLoading();
    this.loading.present().then(()=>{
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
                    this.loading.dismiss();
                    console.log("PRODUCTOS ERROR", err);
                  })
              }
              if (order.estatus=="PENDIENTE"){
                order.estatus_image = "en-proceso.png";
              }

              let meses = [
                "Enero", "Febrero", "Marzo",
                "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre",
                "Noviembre", "Diciembre"
              ]
              
              let d = new Date(order.created_at);
              let dia = d.getDate();
              let mes = d.getMonth();
              let yyy = d.getFullYear();
              let fecha_formateada = dia + ' de ' + meses[mes] + ' de ' + yyy;

              order.fecha = fecha_formateada;
              order.detalles = productos;
              this.orders.push(order);
              this.loading.dismiss();
            },(err)=>{
              this.loading.dismiss();
              console.log("PRODUCTOS ERROR", err);
            })
        }
      },(err)=>{
        this.loading.dismiss();
        console.log("PRODUCTOS ERROR", err);
      }
    );});
  }

  backPage():void{
    this.navCtrl.pop();
  }

}
