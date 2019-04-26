import { Component, ElementRef, HostListener } from '@angular/core';
import { DrawerCategoryService } from '../drawer-category/drawer-category-service';

//Providers

@Component({
  selector: 'drawer-category-panel',
  templateUrl: 'drawer-category-panel.html'
})
export class DrawerCategoryPanel {

  drawer: boolean;

  public static isOneGesture : boolean = true;

  text: string;

  constructor(public element: ElementRef,
              public drCategoryDrService: DrawerCategoryService) {
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
    if(ev.additionalEvent === "panup"){
      this.showDrawerCategories();
    }
  }

  showDrawerCategories():void{
    this.drCategoryDrService.toggle(true);
  }

}
