import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { Observable } from 'rxjs';
import { OrdenCompra } from '../../../models/ordenes-compra.model';
import { OrdenCompraDetalle } from '../../../models/ordenes-compra-detalle.model';
import Swal from 'sweetalert2';
import { SueldosService } from '../../../services/sueldos.service';
import { Nomina } from '../../../models/efectivocuenta.model';
import { DesembolsoComprasRequest } from 'src/app/models/requests/desembolso-compras.request';
import * as moment from 'moment';

@Component({
  selector: 'app-comprobante-compra',
  templateUrl: './comprobante-compra.component.html',
  styleUrls: ['./comprobante-compra.component.scss']
})
export class ComprobanteCompraComponent implements OnInit {

  public ordenCompraSubscription$: Observable<OrdenCompra[]> = null;
  public numCuentas: Nomina[] = [];
  public currentOrdenCompra: OrdenCompra = null;
  public ordenCompraDetalle: OrdenCompraDetalle[] = [];
  public currentMonto = 0;

  constructor(
    private comprasService: ComprasService,
    private sueldosService: SueldosService
  ) { }

  ngOnInit(): void {
    this.ordenCompraSubscription$ = this.comprasService.getOrdenesCompra();
    this.sueldosService.getdAllNumeroCuenta()
      .subscribe( items => this.numCuentas = items );
  }

  public handleGetOrdenesCompra(ordenCompra: OrdenCompra): void{
    this.currentOrdenCompra = ordenCompra;
    this.comprasService.getOrdenesCompraDetalle(ordenCompra.numero_orden_compra)
      .subscribe( (items) => this.ordenCompraDetalle = items );
  }

  public handleSearch({ target: { value } }): void{
    this.ordenCompraSubscription$ = this.comprasService.getOrdenesCompraById(value);
  }

  public handleChargeMonto({ target: { value } }): void{
    this.currentMonto = this.numCuentas.find( (nc) => nc.numero_cuenta === value ).monto;
  }

  public handleGoDesembolsarEfectivo(idNumeroCuenta: string): void{
    const fecha = moment().format('YYYY-MM-DD');
    const desCompras: DesembolsoComprasRequest = {
      fecha, idCodigoFactura: this.currentOrdenCompra.proveedor_factura,
      idEmpleado: this.currentOrdenCompra.id_empleado, idNumeroCuenta,
      idNumeroOrdenCompra: this.currentOrdenCompra.numero_orden_compra,
      idProveedor: this.currentOrdenCompra.id_proveedor,
      monto: this.currentOrdenCompra.precio_total_esperado
    };
    console.log(desCompras, this.currentOrdenCompra)
    this.comprasService.postDesembolsarEfectivo(desCompras)
      .subscribe(
        ({ msg }) => {
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.ordenCompraSubscription$ = this.comprasService.getOrdenesCompra();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al realizar el desembolso', text: err.msg
        })
      );
  }
}
