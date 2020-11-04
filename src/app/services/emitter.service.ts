import { Injectable, EventEmitter } from '@angular/core';
import { ItemByEstado } from '../models/items-by-estado.model';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  constructor() { }

  public handleOrdenarProductos$: EventEmitter<ItemByEstado[]> = new EventEmitter();
}
