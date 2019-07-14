import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
  })

export class AboutPage{
    VERSION: string;

    constructor(public global: GlobalProvider){
      this.VERSION = GlobalProvider.VERSION;
    }
}