import { Component, Renderer, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the DrawerOpacityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drawer-opacity',
  templateUrl: 'drawer-opacity.html'
})
export class DrawerOpacity {

  text: string;

  contentOpacityDisplay: string = "no-opacity-content";

  constructor(public renderer: Renderer,
    public element: ElementRef, public platform: Platform) {

  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
  }

  content(serviDisplay: boolean, isFilter: boolean){
      if (serviDisplay){
        this.showContent(isFilter);
      } else {
        this.hideContent(isFilter);
      }
  }

  showContent(isFilter: boolean) {
    this.renderer.setElementStyle(this.element.nativeElement, 'bottom', '0px');
    if (isFilter){
      this.contentOpacityDisplay = "is-filter opacity-content";
    }else {
        this.contentOpacityDisplay = "is-not-filter opacity-content";
    }
  }

  hideContent(isFilter: boolean) {
    if (isFilter){
      this.contentOpacityDisplay = "is-filter no-opacity-content";
    }else {
        this.contentOpacityDisplay = "is-not-filter no-opacity-content";
    }
    setTimeout(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
    }, 600);
  }

}
