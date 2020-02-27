import { Injectable } from '@angular/core';

import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }

  cargarImagenesFirebase(imagenes: FileItem[]){

    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.subiendo = true;

      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child( `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }` ).put(item.archivo);
    
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
        
        ( snapshot: firebase.storage.UploadTaskSnapshot  ) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100, 
        ( err ) => console.log("error al subit", err), 
        () => {
          console.log("Imagen cargada completamente");
          item.url = uploadTask.snapshot.downloadURL;
          item.subiendo = false;

          // guardo a firebase
          this.guardarImagen({
            nombre: item.nombreArchivo, 
            url: item.url
          })
        }
        
        
        
        )
    
    }

    Swal.fire({
       title: 'Very nice!',
       text: 'Your images were succesfully uploaded. Now, you can view them at the galery.',
       icon: 'success',
       confirmButtonText: 'Ok'
    });
    

  }

  private guardarImagen( imagen: { nombre: string, url: string } ){
    this.db.collection(`${ this.CARPETA_IMAGENES }`).add( imagen );
  }
}
