import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UsuarioRequest } from '../models/requests/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseAPI = `${ environment.API }/empleado`;
  private baseAPI2 = `${ environment.API }/usuario`;

  constructor(private httpClient: HttpClient) { }

  // http://localhost:3000/api/v1/empleado
  public findAll(): any{
    return this.httpClient.get<any>(`${ this.baseAPI }`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  // http://localhost:3000/api/v1/empleado?search=''
  public findByNameOrSurname(paramSearch: string): Observable<any>{
    return this.httpClient.get(`${ this.baseAPI }?search=${ paramSearch }`);
  }

  // http://localhost:3000/api/v1/empleado/inactives
  public findAllInactives(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

  // http://localhost:3000/api/v1/empleado/inactives?search=''
  public findByNameOrSurnameInactives(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

  // http://localhost:3000/api/v1/empleado
  public save(): any{
    // return this.httpClient.post(`${ this.baseAPI }`);
  }

  public saveUsuario(usuarioRequest: UsuarioRequest): Observable<any>{
    return this.httpClient.post<any>(`${ this.baseAPI2 }`, usuarioRequest)
    .pipe(
      catchError<any, any>(
        ({ error }) => {
          if (error.errors){
            const entries: any = Object.entries(error.errors);
            let errors = '';
            entries.forEach(([key, value]) => {
              errors += `${value.msg}-`;
            });
            return throwError({ msg: errors });
          }else{
            return throwError({ msg: error.msg.sqlMessage });
          }
       })
    );
  }

  // http://localhost:3000/api/v1/empleado/:idEmpleado
  public deleteById(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

}

