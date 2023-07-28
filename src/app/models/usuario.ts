export class Usuario{
     nombre : string;
     correo: string;
     urlFoto: string;

     constructor(nombre: string, correo: string, urlFoto: string){
        this.nombre= nombre;
        this.correo= correo;
        this.urlFoto= urlFoto;
     }
}