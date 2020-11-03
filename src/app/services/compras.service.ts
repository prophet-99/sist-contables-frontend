import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ItemsByEstadoResponse, ItemByEstado } from '../models/items-by-estado.model';
import { map } from 'rxjs/operators';

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

}
