import { Component, Renderer, ElementRef, Input } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';
import { DrawerCategoryService } from './drawer-category-service';
import { DrawerOpacity } from '../drawer-opacity/drawer-opacity';
import { GlobalProvider } from '../../providers/global/global';
import { StartPage } from '../../pages/start/start';

@Component({
  selector: 'drawer-category',
  templateUrl: 'drawer-category.html'
})
export class DrawerCategory {

  @Input('sideBar') sideBar: DrawerOpacity;
  @Input('categ') categ: any;

  categories = [
    {
      name: "Tecnología",
      image: "tegnology-category.jpg"
    },
    {
      name: "Hogar",
      image: "house-category.jpg"
    },
    {
      name: "Accesorios",
      image: "accessory.jpg"
    }
  ]

  constructor(public domCtrl : DomController, public renderer: Renderer,
    public element: ElementRef, public platform: Platform, 
    public drCategoryService: DrawerCategoryService,
    public startPage: StartPage) {
  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() + 'px');
    this.content();
  }

  content():void{
    this.drCategoryService.change.subscribe(serviDisplay => {
      if (serviDisplay){
        this.showContent();
      } else{
        this.hideContent();
      }
    });
  }

  hideContent():void {
    // GlobalProvider.setDrawer(false);
    // this.startPage.globalDrawer = false;
    this.sideBar.content(false,false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() + 'px');
    })
  }

  showContent():void{
    // GlobalProvider.setDrawer(true);
    // this.startPage.globalDrawer = true;
    this.sideBar.content(true,false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', '0px');
    })
  }

  viewCat(category){
    this.hideContent();
    if (!(category.id === this.startPage.categoryNumber)){
      this.startPage.categoryNumber = category.id;
      this.startPage.products = [];
      this.startPage.pagesProd = [];
      this.startPage.slidesList.toArray()[1].slideTo(category.id-1);
      this.startPage.getPageProducts(category.id);
    }

    console.log(category.name);
  }
  
}
