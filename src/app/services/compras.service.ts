import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ItemsByEstado } from '../models/items-by-estado.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseAPI = `${ environment.API }/compra`;

  constructor(private httpClient: HttpClient) { }

  public getAllItemsEstado(): Observable<ItemsByEstado>{
    return this.httpClient.get<ItemsByEstado>(`${ this.baseAPI }/itemsestado`);
  }

}
