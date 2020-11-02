import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsByEstado } from 'src/app/models/items-by-estado.model';
import { ComprasService } from '../../../services/compras.service';

@Component({
  selector: 'app-disponibilidad-producto',
  templateUrl: './disponibilidad-producto.component.html',
  styleUrls: ['./disponibilidad-producto.component.scss']
})
export class DisponibilidadProductoComponent implements OnInit {

  public lstItems = [];

  constructor(private compraService: ComprasService) { }

  ngOnInit(): void {
    this.compraService.getAllItemsEstado()
      .subscribe( ({ items }) => this.lstItems = items );
  }

}
