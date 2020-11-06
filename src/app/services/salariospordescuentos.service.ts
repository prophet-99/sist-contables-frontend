import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Nomina, WelcomePagos } from '../models/requests/salariopordescuento.request';

@Injectable({
  providedIn: 'root'
})
export class SalariospordescuentosService {

  private baseAPI = `${ environment.API }/nomina`;

  constructor(private httpClient: HttpClient) { }

  public getAllSalariosPorDescuentos(): Observable<Nomina[]>{
    return this.httpClient.get<WelcomePagos>(`${ this.baseAPI }/salariospordescuento`)
    .pipe(
      map( ({ nominas }) => nominas )
    );
  }
}
