import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { StartPage } from '../start/start';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  myForm: FormGroup;

  resp: any;

  FormLog = {
    email:"",
    password:""
  };

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public fb: FormBuilder,
    public alertController: AlertController) {
      this.myForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
  }

  goBack():void{
    this.navCtrl.pop();
  }

  async goStart(){
    const loading = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 2000
    });
    loading.present();
    loading.dismiss().then(() => { 
      /*this.restProvider.getDataUrl('https://jsonplaceholder.typicode.com/users').then(data => {
        console.log(data);
      });*/
      this.getFromStorageAsync();
   });
  }

  async getFromStorageAsync(){
    return await this.userLog();
  }

  userLog() {
    this.restProvider.userLog(this.FormLog.email, this.FormLog.password)
    .then(data => {
      console.log(data);
      this.resp = data;
      /*if(this.resp.Error){
        this.showAlert(this.resp.Error);
      } else {
        localStorage.setItem("token", this.resp.api_token);
        this.navCtrl.push(StartPage);
      }*/
    }).catch((error) =>{
      console.log('----ERROR----');
      console.log(error)
    });
  }
  
  showAlert(error : string) {
    const alert = this.alertController.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

}
