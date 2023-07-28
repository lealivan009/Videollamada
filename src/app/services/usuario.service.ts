import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, catchError, throwError, map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //Buscar un usuario y convertirlo a un tipo Permiso
  findOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>("http://localhost:8080/api/perfil/" + id).pipe(
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrio un error");
      }),
      map(json => { return new Usuario(json.nombre, json.correo, json.urlFoto) }))
  }

  findOneG(id: number): Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/perfil/" + id, {observe: "response"});
  }
}
