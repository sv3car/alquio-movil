import { Component, ElementRef } from '@angular/core';
import { DrawerCategoryService } from '../drawer-category/drawer-category-service';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the DrawerCategoryPanelHideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drawer-category-panel-hide',
  templateUrl: 'drawer-category-panel-hide.html'
})
export class DrawerCategoryPanelHide {

  text: string;

  constructor(public element: ElementRef,
              public drCategoryDrService: DrawerCategoryService,
              public globalProv: GlobalProvider) {
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }

  handlePan(ev){
    if(ev.additionalEvent === "pandown" /*&& this.globalProv.getDrawer()*/){
      this.hideDrawerCategories();
    }
  }

  hideDrawerCategories():void{
    this.drCategoryDrService.toggle(false);
  }
}
