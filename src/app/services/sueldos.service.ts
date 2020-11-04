import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SueldoRequest } from '../models/requests/sueldo.request.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Sueldos, SueldosModels } from '../models/sueldos.models';
import { Nomina, NumeroCuenta } from '../models/efectivocuenta.model';
import { DescuentoRequest, Nominas } from '../models/descuento.model';

@Injectable({
  providedIn: 'root'
})
export class SueldosService {

  private baseAPI = `${ environment.API }/nomina`;

  constructor(private httpClient: HttpClient) { }
/* 
  public findAll(): Observable<Sueldos[]>{
    return this.httpClient.get<SueldosModels>(`${ this.baseAPI }/nominasueldos`)
      .pipe(
        map(({ sueldos }) => sueldos)
      );
  } */

  public findAllNumeroCuenta(): Observable<Nomina[]>{
    return this.httpClient.get<NumeroCuenta>(`${ this.baseAPI }/efectivocuentas`)
      .pipe(
        map(({ nominas }) => nominas)
      );
  }

  public getAllDescuentos(): Observable<Nominas[]>{
    return this.httpClient.get<DescuentoRequest>(`${ this.baseAPI }/descuentos`)
      .pipe(
        map(({ nomina }) => nomina)
      );
  }

  public save(sueldoRequest: SueldoRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/nominasueldos`, sueldoRequest)
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
}
