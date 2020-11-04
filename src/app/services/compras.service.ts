import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ItemsByEstadoResponse, ItemByEstado } from '../models/items-by-estado.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetalleDisponibilidadRequest } from '../models/requests/detalle-disponibilidad.request';
import { RegistrarCompraRequest } from '../models/requests/registrar-compra.request';
import { DetalleOrdenRequest } from '../models/requests/detalle-orden.request';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseAPI = `${ environment.API }/compra`;

  constructor(private httpClient: HttpClient) { }

  public getAllItemsEstado(): Observable<ItemByEstado[]>{
    return this.httpClient.get<ItemsByEstadoResponse>(`${ this.baseAPI }/itemsestado`)
      .pipe(
        map( ({ items }) => items )
      );
  }

  public postVerificarDisponibilidad(
    hora: string, fecha: string, idEmpleado: number
  ): Observable<{ ok: boolean, idVerificar: number }>{
    return this.httpClient.post<{ ok: boolean, idVerificar: number }>(
      `${ this.baseAPI }/verificardisponibilidad`, { hora, fecha, idEmpleado }
    ).pipe(
      catchError<any, any>(({ error }) => this.handleError(error))
    );
  }

  public postDetalleVerificarDisponibilidad(detalleReq: DetalleDisponibilidadRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/detalledisponibilidad`, detalleReq)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postRegistrarCompra(registrarReq: RegistrarCompraRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/registrarcompra`, registrarReq)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postRegistrarDetalleOrden(detalleOrdenReq: DetalleOrdenRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/detalleorden`, detalleOrdenReq)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  private handleError(error): Observable<{ msg: string }>{
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
  }
}
