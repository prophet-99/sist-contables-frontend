import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { Observable } from 'rxjs';
import { OrdenCompra } from '../../../models/ordenes-compra.model';
import { OrdenCompraDetalle } from '../../../models/ordenes-compra-detalle.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobante-compra',
  templateUrl: './comprobante-compra.component.html',
  styleUrls: ['./comprobante-compra.component.scss']
})
export class ComprobanteCompraComponent implements OnInit {

  public ordenCompraSubscription$: Observable<OrdenCompra[]> = null;
  public currentOrdenCompra: OrdenCompra = null;
  public ordenCompraDetalle: OrdenCompraDetalle[] = [];

  constructor(
    private comprasService: ComprasService
  ) { }

  ngOnInit(): void {
    this.ordenCompraSubscription$ = this.comprasService.getOrdenesCompra();
  }

  public handleGetOrdenesCompra(ordenCompra: OrdenCompra): void{
    this.currentOrdenCompra = ordenCompra;
    console.log(this.currentOrdenCompra)
    this.comprasService.getOrdenesCompraDetalle(ordenCompra.numero_orden_compra)
      .subscribe( (items) => this.ordenCompraDetalle = items );
  }

  public handleSearch({ target: { value } }): void{
    this.ordenCompraSubscription$ = this.comprasService.getOrdenesCompraById(value);
  }

  public handleGoDesembolsarEfectivo(): void{
    Swal.fire({
      title: '¿Está seguro que desea realizar el pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, realizar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelado',
          'Se pagó la orden correctamente.',
          'success'
        )
      }
    })
  }
}
