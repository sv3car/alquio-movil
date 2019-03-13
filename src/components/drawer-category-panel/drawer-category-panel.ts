import { Component, ElementRef, Renderer, HostListener } from '@angular/core';
import { DomController, Platform, ModalController } from 'ionic-angular';
import { StartService } from '../../pages/start/start-service';
import { DrawerCategoryService } from '../drawer-category/drawer-category-service';

//Providers
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the DrawerCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drawer-category-panel',
  templateUrl: 'drawer-category-panel.html'
})
export class DrawerCategoryPanel {

  drawer: boolean;

  public static isOneGesture : boolean = true;

  text: string;

  constructor(public element: ElementRef,
              public modalCtrl: ModalController,
              public drCategoryDrService: DrawerCategoryService,
              public globalProv: GlobalProvider) {
  }

  @HostListener('click')
  click() {
    this.showDrawerCategories();
  }

  ngAfterViewInit() {
      let hammer = new window['Hammer'](this.element.nativeElement);
      hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
      hammer.on('pan', (ev) => {
        this.handlePan(ev);
      });
  }

  handlePan(ev){
    if(ev.additionalEvent === "panup" /*&& !this.globalProv.getDrawer()*/ /*&& DrawerCategoryPanel.isOneGesture*/){
      this.showDrawerCategories();
      /*DrawerCategoryPanel.isOneGesture = false;
      let modal = this.modalCtrl.create(ActionCategoryPage);
      modal.present();*/
    }
  }

  showDrawerCategories():void{
    this.drCategoryDrService.toggle(true);
  }

}
