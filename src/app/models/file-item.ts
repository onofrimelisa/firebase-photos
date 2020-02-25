export class FileItem{
    public archivo: File; 
    public nombreArchivo: string;
    public subiendo: boolean;
    public url: string;
    public progreso: number;

    constructor( archivo: File ){
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.subiendo = false;
        this.progreso = 0;
    }
}