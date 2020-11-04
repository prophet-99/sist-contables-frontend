import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UsuarioRequest } from '../models/requests/usuario.request.model';
import { Empleado, EmpleadoResponse } from '../models/empleado.model';
import { EmpleadoRequest } from '../models/requests/empleado.request.model';
import { Cargo, CargoResponse } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseAPI = `${ environment.API }/empleado`;
  private baseAPI2 = `${ environment.API }/usuario`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Empleado[]>{
    return this.httpClient.get<EmpleadoResponse>(`${ this.baseAPI }`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  public findByNameOrSurname(paramSearch: string): Observable<Empleado[]>{
    return this.httpClient.get<EmpleadoResponse>(`${ this.baseAPI }?search=${ paramSearch }`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  public findAllInactives(): Observable<Empleado[]>{
    return this.httpClient.get<EmpleadoResponse>(`${ this.baseAPI }/inactives`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  public findByNameOrSurnameInactives(paramSearch: string): Observable<Empleado[]>{
    return this.httpClient.get<EmpleadoResponse>(`${ this.baseAPI }/inactives?search=${ paramSearch }`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  public getAllCargos(): Observable<Cargo[]>{
    return this.httpClient.get<CargoResponse>(`${ this.baseAPI }/cargos`)
      .pipe(
        map(({ cargos }) => cargos)
      );
  }


  public save(empleadoRequest: EmpleadoRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }`, empleadoRequest)
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

  public saveUsuario(usuarioRequest: UsuarioRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI2 }`, usuarioRequest)
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

  public deleteById(idEmpleado: number): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.delete<{ ok: boolean, msg: string }>(`${ this.baseAPI }/${ idEmpleado }`);
  }

}

