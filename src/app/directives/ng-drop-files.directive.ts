import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, Host } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input('archivos') archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ){
    this.mouseSobre.emit( true );
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ){
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ){
    
    const transferencia = this.getTransferencia( event );
    if (!transferencia) {
      return;  
    }
    
    this.extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  // compatibilidad en navegadores
  private getTransferencia( event: any ){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos( archivos: FileList ){

    for (const propiedad in Object.getOwnPropertyNames( archivos )) {
      const archivoTemp = archivos[propiedad];

      if (this.puedeCargarse( archivoTemp )) {
        const archivoNew = new FileItem( archivoTemp );
        this.archivos.push(archivoNew);
      }
    }    
    
  }

  // ###############################################################################
  //										VALIDACIONES
  // ###############################################################################  
  private puedeCargarse( archivo: File ): boolean{
    if ( !this._archivoYaDropeado( archivo.name ) && this._esImagen( archivo.type )){
      return true;
    }
    return false;
  }
  
  private _prevenirDetener( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaDropeado( nombre: string ): boolean{
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == nombre) {
        console.log('ya existe');
        return true;
      }
    }

    return false;
  }

  private _esImagen( tipo: string ): boolean{
    return (tipo == '' || tipo == undefined) ? false : tipo.startsWith('image');
  }

}
