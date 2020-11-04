import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Welcome, Cliente } from '../models/cliente.model';
import { catchError, map } from 'rxjs/operators';
import { ClienteRequest } from '../models/requests/cliente.request.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /*http://localhost:3000/api/v1/cliente/*/
  private baseAPI = `${environment.API}/cliente`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Cliente[]>{
    return this.httpClient.get<Welcome>(`${ this.baseAPI }`)
      .pipe(
        map(({ clientes }) => clientes)
      );
  }

  public findByNameOrSurname(paramSearch: string): Observable<Cliente[]>{
    return this.httpClient.get<Welcome>(`${this.baseAPI}?search=${ paramSearch }`)
    .pipe(
      map(({clientes}) => clientes)
    );
  }

  public save( clienteRequest: ClienteRequest): Observable<{ok: boolean, msg: string}>{
    return this.httpClient.post<{ok: boolean, msg: string}>(`${this.baseAPI}`, clienteRequest)
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

  public deleteById(idCliente: number): Observable<{ok: boolean, msg: string}>{
    return this.httpClient.delete<{ok: boolean, msg: string}>(`${this.baseAPI}/${idCliente}`);
  }

}
