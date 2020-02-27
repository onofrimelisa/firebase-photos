import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenService } from '../../services/carga-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  sobreDrop: boolean = false;

  constructor( public _cis: CargaImagenService ) { }

  ngOnInit() {
  }

  cargarImagenes(){
    this._cis.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos(){
    Swal.fire({
       title: 'Are you sure?',
       text: 'Your files will be deleted.',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete.',
       cancelButtonText: 'Cancel'
    })
    .then( (result) => {
       if (result.value) {
           
         this.archivos = [];
       }
    });
  }
}
