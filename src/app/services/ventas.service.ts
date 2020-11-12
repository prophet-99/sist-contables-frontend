import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ItemsByEstadoResponse, ItemByEstado } from '../models/items-by-estado.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetalleDisponibilidadRequest } from '../models/requests/detalle-disponibilidad.request';
import { RegistrarCompraRequest } from '../models/requests/registrar-compra.request';
import { DetalleOrdenRequest } from '../models/requests/detalle-orden.request';
import { OrdenesCompraResponse, OrdenCompra } from '../models/ordenes-compra.model';
import { OrdenCompraDetalle, OrdenesCompraDetalleResponse } from '../models/ordenes-compra-detalle.model';
import { RecepcionarCompraRequest } from '../models/requests/recepcionar-compra.request';
import { DetalleRecepcionRequest } from '../models/requests/detalle-recepcion.request';
import { DesembolsoComprasRequest } from '../models/requests/desembolso-compras.request';
import { DetalleRecomendacion, Ite} from '../models/detalle-recomendacion.model';
import { RecomendacionRespons, Recomendacion} from '../models/getdetallerecomendacion.model';



@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseAPI = `${ environment.API }/venta`;

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

  public postRecomendacion(
    numeroRecomendacion, descripcion, idVerificarDisponibilidad, idNumeroCliente
  ): Observable<{ ok: boolean, msg: string }>{
    const val = { numeroRecomendacion, descripcion, idVerificarDisponibilidad, idNumeroCliente };
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/addrecomendacion`, val)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postDetalleRecomendacion(detalle): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/detallerecomendacion`, detalle)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postPedido(
    numeroOrden, fechaPedido, fechaPrometida, condiciones, idVerificarDisponibilidad, idNumeroCliente,
    idEmpleado
  ): Observable<{ ok: boolean, msg: string }>{
    const val = {
      numeroOrden, fechaPedido, fechaPrometida, condiciones, idVerificarDisponibilidad, idNumeroCliente,
      idEmpleado
     };
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/addpedido`, val)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postDetallePedido(detalle): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/detallepedido`, detalle)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postEnviarItems(detalle): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/enviaritems`, detalle)
      .pipe(
        catchError<any, any>(({ error }) => this.handleError(error))
      );
  }

  public postDetalleEnvio(detalle): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/detalleenvio`, detalle)
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

  public getRecomendacionCliente(): Observable<Recomendacion[]>{
    return this.httpClient.get<RecomendacionRespons>(`${ this.baseAPI }/listarRecomendaciones`)
      .pipe(
        map( ({ recomendacion }) => recomendacion )
      );
  }
  public getRecomendacionID(idDetalleRecomendacion: string): Observable<Ite[]>{
    return this.httpClient.post<DetalleRecomendacion>(
      `${ this.baseAPI }/detallexrecomendacion`, { idDetalleRecomendacion }
    ).pipe(
      map(({ items }) => items)
    );
  }

}
