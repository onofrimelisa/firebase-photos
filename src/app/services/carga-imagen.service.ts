import { Injectable } from '@angular/core';

import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }

  private guardarImagen( imagen: { nombre: string, url: string } ){
    this.db.collection(`${ this.CARPETA_IMAGENES }`).add( imagen );
  }
}
