import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//import {throwError} from 'rxjs';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

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

  perfil: any;

  edit: boolean = false;
  user_name: string;
  namePage: any;

  //Variables para tomar foto
  public myPhoto: any;
  public error: string;
  private loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public global: GlobalProvider,
              public alertCtrl: AlertController,
              public rest: RestProvider,
              public file: File,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private actionSheetController: ActionSheetController,
              private camera: Camera,
              public platform: Platform,
              private filePath: FilePath) {

      this.perfil = this.global.getJSONLocalStorage(GlobalProvider.USER_LOCAL);
    
    /**
    * Nombre de la Página
    */
    this.namePage = {
      name: 'user_detiail'
    };

      this.rest.getData('user', "?api_token=" + localStorage.getItem('token')).then((data: any) => {
         console.log(data);
         this.perfil=data;
       });

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
          name: GlobalProvider.USER_PROPERTY_TO_BACK_PROPERTY[titleParam],
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
            console.log(JSON.stringify(data));
            this.rest.postData("user-edit?api_token=" + localStorage.getItem('token'), JSON.stringify(data))
            .then((data:any)=>{
              console.log("Change submitted",data);
              if(data.Error){
                this.showAlert(data.Error);
            } else {
                localStorage.setItem(GlobalProvider.USER_LOCAL, JSON.stringify(data));
                this.perfil=data;
              }
            },
            (err)=>{
              this.showAlert("No se pudo realizar los cambios.");
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(error : string, title? : string) {
    const alert = this.alertCtrl.create({
      title: title? title : "Error",
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

  //Metodos para implementar subida de imagen al servidor

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        title: "Seleccione fuente",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    
    console.log("I got here");
    this.showAlert("Aquí entro a la función takePicture","Esto es troubleshooting");
    this.camera.getPicture(options).then(imagePath => {
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.showAlert(correctPath,"Direccion correcta");
                    this.showAlert(String(currentName),"Este es el nombre");
                    this.showAlert("Estas son alertas para probar cosas","Carlos para bolas");
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        }
    });
 
  }

  /* takePhoto() {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      quality: 100,
      destinationType: camera.DestinationType.FILE_URI,
      sourceType: camera.PictureSourceType.CAMERA,
      encodingType: camera.EncodingType.JPEG
    });
  }

  selectPhoto(): void {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: camera.EncodingType.JPEG,
    });
  }

  private convertFileSrc(url: string): string {
    if (!url) {
      return url;
    }
    if (url.startsWith('/')) {
      return window['WEBVIEW_SERVER_URL'] + '/_app_file_' + url;
    }
    if (url.startsWith('file://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_');
    }
    if (url.startsWith('content://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_');
    }
    return url;
  } */

  /* private async uploadPhoto(imageFileUri: any) {
    this.error = null;
    this.loading = await this.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.loading.present();

    window['resolveLocalFileSystemURL'](imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
      });
  } */

  /* private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  } */

  /* private postData(formData: FormData) {
    this.http.post<boolean>(`${environment.serverURL}/upload`, formData)
      .pipe(
        catchError(e => this.handleError(e)),
        finalize(() => this.loading.dismiss())
      )
      .subscribe(ok => this.showToast(ok));
  } */

/*   private async showToast(ok: boolean | {}) {
    if (ok === true) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  } */

/*   private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  } */

}
