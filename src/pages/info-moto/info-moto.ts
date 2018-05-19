import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { ActivarServicioPage } from '../activar-servicio/activar-servicio';
import { VehiculoPage } from '../vehiculo/vehiculo';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ServiceMotoProvider } from '../../providers/service-moto/service-moto';

/**
 * Generated class for the InfoMotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-info-moto',
  templateUrl: 'info-moto.html',
})
export class InfoMotoPage {

  placa: any;
  correoC: any;
  lastImageMotoLtDr: string = null;
  lastImageCon: string = null;
  lastImageMotoLtIz:string = null;
  lastImageMotoF:string = null;
  lastImageMotoT:string = null;
  loading: Loading;
  constructor(public serviceMoto: ServiceMotoProvider,public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.serviceMoto.getEmail().then((email)=>{
      this.correoC = email;
    });

    this.placa = navParams.get("placa");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoMotoPage');
  }

  public tomarFoto() {
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

  public tomarFotoMotoLtIz() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Foto de la Galeria',
          handler: () => {
            this.takePictureMotoLtIz(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePictureMotoLtIz(this.camera.PictureSourceType.CAMERA);
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

  public tomarFotoMotoLtDr() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Foto de la Galeria',
          handler: () => {
            this.takePictureMotoLtDr(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePictureMotoLtDr(this.camera.PictureSourceType.CAMERA);
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

  public tomarFotoMotoF() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Foto de la Galeria',
          handler: () => {
            this.takePictureMotoF(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePictureMotoF(this.camera.PictureSourceType.CAMERA);
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

  public tomarFotoMotoT() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Foto de la Galeria',
          handler: () => {
            this.takePictureMotoT(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePictureMotoT(this.camera.PictureSourceType.CAMERA);
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

  public takePictureMotoLtIz(sourceType) {
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
            this.copyFileToLocalDirMotoLtIz(correctPath, currentName, this.createFileNameMotoLtIz());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirMotoLtIz(correctPath, currentName, this.createFileNameMotoLtIz());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  public takePictureMotoLtDr(sourceType) {
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
            this.copyFileToLocalDirMotoLtDr(correctPath, currentName, this.createFileNameMotoLtDr());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirMotoLtDr(correctPath, currentName, this.createFileNameMotoLtDr());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  public takePictureMotoF(sourceType) {
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
            this.copyFileToLocalDirMotoF(correctPath, currentName, this.createFileNameMotoF());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirMotoF(correctPath, currentName, this.createFileNameMotoF());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  public takePictureMotoT(sourceType) {
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
            this.copyFileToLocalDirMotoT(correctPath, currentName, this.createFileNameMotoT());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirMotoT(correctPath, currentName, this.createFileNameMotoT());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileNameCon() {
    var nom = "conductor";
    var d = new Date(),
    n = d.getTime(),
    newFileName =  this.correoC + nom + n + ".jpg";
    return newFileName;
  }

  private createFileNameMotoLtIz() {
    var nom = "MotoLtIz";
    var d = new Date(),
    n = d.getTime(),
    newFileName =this.correoC + nom + n + ".jpg";
    return newFileName;
  }

  private createFileNameMotoLtDr() {
    var nom = "MotoLtDr";
    var d = new Date(),
    n = d.getTime(),
    newFileName =this.correoC + nom + n + ".jpg";
    return newFileName;
  }
  private createFileNameMotoF() {
    var nom = "MotoF";
    var d = new Date(),
    n = d.getTime(),
    newFileName =this.correoC + nom + n + ".jpg";
    return newFileName;
  }

  private createFileNameMotoT() {
    var nom = "MotoT";
    var d = new Date(),
    n = d.getTime(),
    newFileName =this.correoC + nom + n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDirCon(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageCon = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  private copyFileToLocalDirMotoLtIz(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageMotoLtIz = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private copyFileToLocalDirMotoLtDr(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageMotoLtDr = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private copyFileToLocalDirMotoF(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageMotoF = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private copyFileToLocalDirMotoT(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImageMotoT = newFileName;
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
    var url = "https://wrodelogarcia.000webhostapp.com/motofacil/subirFotos.php";
   
    // File for Upload
    var targetPathCon = this.pathForImage(this.lastImageCon);
    //MotoLtIz
    var targetPathMotoLtIz = this.pathForImage(this.lastImageMotoLtIz);
    //MotoLtDr
    var targetPathMotoLtDr = this.pathForImage(this.lastImageMotoLtDr);
    //MotoF
    var targetPathMotoF = this.pathForImage(this.lastImageMotoF);
    //MotoF
    var targetPathMotoT = this.pathForImage(this.lastImageMotoT);
    // File name only
    var filenameCon = this.lastImageCon;
    //MotoLtIz
    var filenameMotoLtIz = this.lastImageMotoLtIz
    //MotoLtIz
    var filenameMotoLtDr = this.lastImageMotoLtDr
    //MotoLtIz
    var filenameMotoF = this.lastImageMotoF
    //MotoLtIz
    var filenameMotoT = this.lastImageMotoT

    var optionsCon = {
      fileKey: "file",
      fileName: filenameCon,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameCon}
    };
    //MotoLtIz
    var optionsMotoLtIz = {
      fileKey: "file",
      fileName: filenameMotoLtIz,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameMotoLtIz}
    };

    //MotoLtDr
    var optionsMotoLtDr = {
      fileKey: "file",
      fileName: filenameMotoLtDr,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameMotoLtDr}
    };

    //MotoF
    var optionsMotoF = {
      fileKey: "file",
      fileName: filenameMotoF,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameMotoF}
    };

    //MotoT
    var optionsMotoT = {
      fileKey: "file",
      fileName: filenameMotoT,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filenameMotoT}
    };
   
    const fileTransferCon: TransferObject = this.transfer.create();
    const fileTransferMotoLtIz: TransferObject = this.transfer.create();
    const fileTransferMotoLtDr: TransferObject = this.transfer.create();
    const fileTransferMotoF: TransferObject = this.transfer.create();
    const fileTransferMotoT: TransferObject = this.transfer.create();
   
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
    //MotoLtIz
    fileTransferMotoLtIz.upload(targetPathMotoLtIz, url, optionsMotoLtIz).then(data => {
      this.loading.dismissAll()
      this.presentToast('Imagen Subida.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
    //MotoDr
    fileTransferMotoLtDr.upload(targetPathMotoLtDr, url, optionsMotoLtDr).then(data => {
      this.loading.dismissAll()
      this.presentToast('Imagen Subida.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
    //MotoF
    fileTransferMotoF.upload(targetPathMotoF, url, optionsMotoF).then(data => {
      this.loading.dismissAll()
      this.presentToast('Imagen Subida.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
    //MotoT
    fileTransferMotoT.upload(targetPathMotoT, url, optionsMotoT).then(data => {
      this.loading.dismissAll()
      this.presentToast('Imagen Subida.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });

    this.serviceMoto.registroMoto(this.correoC,this.placa,filenameCon,filenameMotoLtIz,filenameMotoLtDr,filenameMotoF,filenameMotoT).then((archivos)=>{
      console.log(archivos)
      this.navCtrl.setRoot(ActivarServicioPage);
    });


  }
  

  registrarMoto(){
    console.log("funciona")
    this.navCtrl.setRoot(VehiculoPage);
  }

  prueba(){
    console.log("prueba")
  }

}
