import { Component, ElementRef } from '@angular/core';
import { DrawerCategoryService } from '../drawer-category/drawer-category-service';

@Component({
  selector: 'drawer-category-panel-hide',
  templateUrl: 'drawer-category-panel-hide.html'
})
export class DrawerCategoryPanelHide {

  text: string;

  constructor(public element: ElementRef,
              public drCategoryDrService: DrawerCategoryService) {
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }

  handlePan(ev){
    if(ev.additionalEvent === "pandown"){
      this.hideDrawerCategories();
    }
  }

  hideDrawerCategories():void{
    this.drCategoryDrService.toggle(false);
  }
}
