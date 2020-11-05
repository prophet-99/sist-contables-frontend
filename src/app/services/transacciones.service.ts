import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UsuarioRequest } from '../models/requests/usuario.request.model';
import { Empleado, EmpleadoResponse } from '../models/empleado.model';
import { EmpleadoRequest } from '../models/requests/empleado.request.model';
import { Cargo, CargoResponse } from '../models/cargo.model';
import { GeneralLedgerResponse, GeneralLedger } from '../models/general-ledger.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private baseAPI = `${ environment.API }/estadofinanciero`;

  constructor(private httpClient: HttpClient) { }

  public getGeneralLedger(): Observable<GeneralLedger[]>{
    return this.httpClient.get<GeneralLedgerResponse>(`${ this.baseAPI }/libromayor`)
      .pipe(
        map( ({ libroMayor }) => libroMayor )
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
