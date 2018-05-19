import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { InicioUserPage } from '../inicio-user/inicio-user';


/**
 * Generated class for the RegistroUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-registro-user',
  templateUrl: 'registro-user.html',
})
export class RegistroUserPage {
  correoU: any;
  private registroUser: FormGroup;

  lastImageCon: string = null;
  loading: Loading;
  constructor( public navParams: NavParams,private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,public serviceMoto: ServiceMotoProvider,private formBuilder: FormBuilder,public navCtrl: NavController) {
    this.registroUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroUserPage');
  }


  registro(){
   /* this.serviceMoto.registroUser(this.registroUser.value.nombre,this.registroUser.value.correo,this.registroUser.value.celular).then((data)=>{
      console.log(data)
      //this.navCtrl.setRoot();
    });*/
    //this.registroUser.value.nombre,this.registroUser.value.correo,this.registroUser.value.celular
  }
  tomarFoto(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Foto de la Galeria',
          handler: () => {
            this.takePictureCon(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePictureCon(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePictureCon(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDirCon(correctPath, currentName, this.createFileNameCon());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirCon(correctPath, currentName, this.createFileNameCon());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileNameCon() {
    var nom = "usuario";
    var d = new Date(),
    n = d.getTime(),
    newFileName =  this.registroUser.value.correo + nom + n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDirCon(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageCon = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "https://wrodelogarcia.000webhostapp.com/motofacil/subirFotosUser.php";
   
    // File for Upload
    var targetPathCon = this.pathForImage(this.lastImageCon);
    
    // File name only
    var filenameCon = this.lastImageCon;
    

    var optionsCon = {
      fileKey: "file",
      fileName: filenameCon,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameCon}
    };
    
   
    const fileTransferCon: TransferObject = this.transfer.create();
    
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransferCon.upload(targetPathCon, url, optionsCon).then(data => {
      this.loading.dismissAll()
      this.presentToast('Imagen Subida.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
    
    this.serviceMoto.registroUser(this.registroUser.value.nombre,this.registroUser.value.correo,this.registroUser.value.celular,filenameCon).then((data)=>{
      console.log(data)
      this.navCtrl.setRoot(InicioUserPage);
    });

  }

}
