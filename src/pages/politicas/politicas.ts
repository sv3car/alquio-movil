import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-politicas',
  templateUrl: 'politicas.html'
})
export class PoliticasPage {

  constructor(public navCtrl: NavController, 
            public viewCtrl: ViewController,
            public globalProv : GlobalProvider) {
  }

}