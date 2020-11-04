import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Proveedor, ProveedorResponse } from '../models/proveedor.model';
import { ProveedorRequest } from '../models/requests/proveedor.request.model';
import { Plazo, PlazoResponse } from '../models/plazo.model';



@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private baseAPI = `${ environment.API }/proveedor`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Proveedor[]>{
    return this.httpClient.get<ProveedorResponse>(this.baseAPI)
      .pipe(
        map( ({ proveedores }) => proveedores )
      );
  }

  public findByNameOrSurname(paramSearch: string): Observable<Proveedor[]>{
    return this.httpClient.get<ProveedorResponse>(`${ this.baseAPI }?search=${ paramSearch }`)
      .pipe(
        map(({ proveedores }) => proveedores)
      );
  }

    public getAllPlazos(): Observable<Plazo[]>{
    return this.httpClient.get<PlazoResponse>(`${ this.baseAPI }/plazos`)
      .pipe(
        map(({ plazos }) => plazos)
      );
  }

  public save(proveedorRequest: ProveedorRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }`, proveedorRequest)
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

  public deleteById(idProveedor: number): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.delete<{ ok: boolean, msg: string }>(`${ this.baseAPI }/${ idProveedor }`);
  }
}
