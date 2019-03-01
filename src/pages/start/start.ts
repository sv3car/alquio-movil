import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, ModalController} from 'ionic-angular';


//Providers
import { RestProvider } from '../../providers/rest/rest';
import { GlobalProvider } from '../../providers/global/global';

//Pages
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {

  drawerOptions: any;

  namePage: any;

  nextPage: string;

  categ : any;

  pagesProd : any[] = [];
  
  products : any[] = [];

  @ViewChildren(Slides) slidesList: QueryList<Slides>;

  slides = [
    {
      image: "slider1.jpg",
    },
    {
      image: "slider2.jpg",
    },
    {
      image: "slider3.jpg",
    }
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public restProvider: RestProvider,
              public globalProv: GlobalProvider) {

    this.drawerOptions = {
      handleWidth: 17.25,
      type: '%'
    };

    this.namePage = {
      name: 'start'
    };
  }

  ionViewDidLoad() {
    this.getCategories();
    this.getPageProducts();
  }

  getCategories() {
    this.restProvider.get(localStorage.getItem("token"), 'categorias')
     .then(data => {
      this.categ = data;
    });
  }

  getPageProducts() {
    // this.restProvider.get(localStorage.getItem("token"), 'productos')
    // .then(data => {
    //   this.pagesProd.push(data);
    //   for(let page of this.pagesProd){
    //     for (let prod of page.data){
    //       this.products.push(prod);
    //     }
    //     this.nextPage = page.next_page_url;
    //   }
    //   this.next();
    // });

    this.restProvider.getData("productos", "?api_token="+this.globalProv.api_token)
    .then((data)=>{
      console.log("PRODUCTOS SUCCESS", data);
      
      this.pagesProd.push(data);
        for(let page of this.pagesProd){
          for (let prod of page.data){
            this.products.push(prod);
          }
          this.nextPage = page.next_page_url;
        }
        this.next();

    },(err)=>{
      console.log("PRODUCTOS ERROR", err);
    })
  }

  next(infiniteScroll?) {
    if (infiniteScroll) {
      this.restProvider.getDataUrl(this.nextPage)
        .then(data => {
          this.pagesProd.push(data);
          let pageCuerrent : any[] = [];
          pageCuerrent.push(data);
          for(let page of pageCuerrent){
            for (let prod of page.data){
              this.products.push(prod);
            }
            this.nextPage = page.next_page_url;
          }
          infiniteScroll.complete();
      });
    }
  }
 
  loadMore(infiniteScroll) {
    this.next(infiniteScroll);
    if (this.nextPage === null) {
      infiniteScroll.enable(false);
    }
  }

  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

  moveLeft(index: number): void {
    console.log(index);
    this.slidesList.toArray()[index].slidePrev(500);
  }   

  moveRight(index: number): void {
    this.slidesList.toArray()[index].slideNext(500);
  } 

  /*showCategories():void{
    let modal = this.modalCtrl.create(ActionCategoryPage);
    modal.present();
  }*/

  ngAfterViewInit() {
    /*this.startService.change.subscribe(serviDisplay => {
        this.changeContent(serviDisplay);
        })*/
  }

  backPage():void{
    //this.startService.toggle(false);
    localStorage.setItem("token", null);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
