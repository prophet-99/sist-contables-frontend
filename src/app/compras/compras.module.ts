import { NgModule } from '@angular/core';

import { ComprobanteCompraComponent } from '../compras/comprobante-compra/comprobante-compra.component';
import { DisponibilidadProductoComponent } from '../compras/disponibilidad-producto/disponibilidad-producto.component';
import { OrdenarProductoComponent } from '../compras/ordenar-producto/ordenar-producto.component';
import { RecibirProductoComponent } from '../compras/recibir-producto/recibir-producto.component';



@NgModule({
  declarations: [
    ComprobanteCompraComponent,
    DisponibilidadProductoComponent,
     OrdenarProductoComponent,
     RecibirProductoComponent
    ],
    exports: [
    ComprobanteCompraComponent,
    DisponibilidadProductoComponent,
     OrdenarProductoComponent,
     RecibirProductoComponent
    ],
})
export class ComprasModule { }
