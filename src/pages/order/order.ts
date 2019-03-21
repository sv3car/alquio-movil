import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdertService } from './order-service';
import { StartService } from '../start/start-service';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  contentOpacityDisplay: string = 'no-exist-content';

  namePage: any;

  orders = [
    {
      number: "No. 337102",
      product: "producto-1.png",
      price: "$100",
      statusImage: "cancelado.png",
      statusName: "Cancelado",
      description: "1- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      number: "No. 097458",
      product: "producto-2.png",
      price: "$200",
      statusImage: "en-proceso.png",
      statusName: "En proceso",
      description: "2- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      number: "No. 764109",
      product: "producto-3.png",
      price: "$40",
      statusImage: "en-transito.png",
      statusName: "En transito",
      description: "3- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      number: "No. 96896",
      product: "producto-4.png",
      price: "$35",
      statusImage: "entregado.png",
      statusName: "Entregado",
      description: "4- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    }
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public orderService: OrdertService, 
              public startService: StartService) {
    /**
     * Nombre de la Página
     */
    this.namePage = {
      name: 'order'
    }
  }

  ngAfterViewInit() {
    this.orderService.change.subscribe(serviDisplay => {
        this.changeContent(serviDisplay);
        })
  }

  changeContent(display: boolean):void{
    if (display) {
        //this.hideFilter = 'true-class';
        this.contentOpacityDisplay = 'exist-content transition-content opacity-content';
    } else {
        //this.hideFilter = 'false-class';
        this.contentOpacityDisplay = 'no-exist-content transition-content no-opacity-content';
    }
  }

  backPage():void{
    this.navCtrl.pop();
  }

}
