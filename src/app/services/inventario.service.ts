import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Inventario, Item } from '../models/inventario.model';
import { ItemRequest } from '../models/requests/inventario.request.model';
import { CategoriaResponse, Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private baseAPI = `${ environment.API }/inventario`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Item[]>{
    return this.httpClient.get<Inventario>(`${ this.baseAPI }/items`)
      .pipe(
        map( ({ items }) => items )
      );
  }

  public findAllActivosFijos(): Observable<Item[]>{
    return this.httpClient.get<Inventario>(`${ this.baseAPI }/items/activosfijos`)
      .pipe(
        map( ({ items }) => items )
      );
  }

  public getAllCategoria(): Observable<Categoria[]>{
    return this.httpClient.get<CategoriaResponse>(`${ this.baseAPI }/items/categorias`)
      .pipe(
        map(({ categorias }) => categorias)
      );
  }

  public getAllCategoriaActivosFijos(): Observable<Categoria[]>{
    return this.httpClient.get<CategoriaResponse>(`${ this.baseAPI }/items/categorias`)
      .pipe(
        map(({ categorias }) => categorias.filter( (c) => c.id === 3 ))
      );
  }

  public findByNameOrSurname(paramSearch: string): Observable<Item[]>{
    return this.httpClient.get<Inventario>(`${ this.baseAPI }/items/?search=${ paramSearch }`)
      .pipe(
        map(({ items }) => items)
      );
  }

  public save(itemRequest: ItemRequest): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.post<{ ok: boolean, msg: string }>(`${ this.baseAPI }/items`, itemRequest)
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

  public deleteById(idItem: string): Observable<{ ok: boolean, msg: string }>{
    return this.httpClient.delete<{ ok: boolean, msg: string }>(`${ this.baseAPI }/items/${ idItem }`);
  }

}
