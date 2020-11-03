import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Proveedor, ProveedorResponse } from '../models/proveedor.model';


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
}
