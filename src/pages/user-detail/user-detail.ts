import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { GlobalProvider } from '../../providers/global/global';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  edit: boolean = false;
  user_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public global: GlobalProvider,
    public rest: RestProvider) {

      this.rest.getData('user', "?api_token=" + localStorage.getItem('token')).then((data: any) => {
        console.log(data);
        this.user_name=data.name;
      });

  }

  ionViewDidLoad() {
    console.log('Vista de Perfil');
  }

}
