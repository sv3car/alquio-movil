import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//providers
import { GlobalProvider } from '../../providers/global/global';

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

  perfil: any;

  edit: boolean = false;
  user_name: string;
  namePage: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public global: GlobalProvider,
              public alertCtrl: AlertController) {

      this.perfil = this.global.getJSONLocalStorage(GlobalProvider.FAVORITE_LOCAL);
    
    /**
    * Nombre de la Página
    */
    this.namePage = {
      name: 'user_detiail'
    };

      // this.rest.getData('user', "?api_token=" + localStorage.getItem('token')).then((data: any) => {
      //   console.log(data);
      //   this.user_name=data.name;
      // });

  }

  ionViewDidLoad() {
    console.log('Vista de Perfil');
  }

  showPrompt(titleParam: string) {
    const prompt = this.alertCtrl.create({
      title: titleParam,
      message: "Ingrese el texto",
      inputs: [
        {
          name: 'title',
          placeholder: titleParam
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
