import { Component, Renderer, ElementRef, Input } from '@angular/core';
import { DomController, Platform, NavController } from 'ionic-angular';
import { DrawerUserService } from './drawer-user-service';
import { OrderPage } from '../../pages/order/order';
import { DrawerOpacity } from '../drawer-opacity/drawer-opacity';
import { JivoChatPage } from '../../pages/jivo-chat/jivo-chat';

//Providers
import { GlobalProvider } from '../../providers/global/global';


//Pages
import { StartService } from '../../pages/start/start-service';
import { ConfigPage } from '../../pages/config/config';

@Component({
  selector: 'drawer-user',
  templateUrl: 'drawer-user.html'
})
export class DrawerUser {

  @Input('options') options: any;
  @Input('sideBar') sideBar: DrawerOpacity;

  name: string = 'none';

  userImg: string = 'user-2.jpg';

  constructor(public domCtrl : DomController,
              public renderer: Renderer,
              public element: ElementRef,
              public platform: Platform, 
              public drUserService: DrawerUserService,
              public navCtrl: NavController,
              public startServices: StartService,
              public globalProv: GlobalProvider) {
      this.userImg = "user-2.jpg";
  }

  ngAfterViewInit() {
    
    if(this.options.name){
      this.name = this.options.name;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
    this.content();
  }

  content():void{
    this.drUserService.change.subscribe(serviDisplay => {
      if (serviDisplay){
        this.showContent();
      } else {
        this.hideContent();
      }
    });
  }

  showContent():void{
    //this.globalProv.setDrawer(true);
    // this.startServices.globalDrawer = true;

    this.sideBar.content(true, false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'bottom 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'bottom', '0px');
    });
  }

  hideContent():void {
    //this.globalProv.setDrawer(false);
    // this.startServices.globalDrawer = false;

    this.sideBar.content(false, false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'bottom 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
    })
  }

  goOrder():void{
    this.hideContent();
    if (!(this.name === 'order')){
      this.navCtrl.push(OrderPage);
    }
  }

  goChat():void{
    this.hideContent();
    if (!(this.name === 'chat')){
      this.navCtrl.push(JivoChatPage);
    }
  }

  goConfig():void{
    this.hideContent();
    if (!(this.name === 'config')){
      this.navCtrl.push(ConfigPage);
    }
  }

}
