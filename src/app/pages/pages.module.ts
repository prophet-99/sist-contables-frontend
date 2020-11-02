import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteComponent } from './cliente/cliente.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import {
    ComprobanteCompraComponent
} from './compras/comprobante-compra/comprobante-compra.component';
import {
    DisponibilidadProductoComponent
} from './compras/disponibilidad-producto/disponibilidad-producto.component';
import { OrdenarProductoComponent } from './compras/ordenar-producto/ordenar-producto.component';
import { RecibirProductoComponent } from './compras/recibir-producto/recibir-producto.component';
import { ComprasComponent } from './compras/compras.component';
import { EntregarProductoComponent } from './ventas/entregar-producto/entregar-producto.component';
import { RegistroRecomendacionComponent } from './ventas/registro-recomendacion/registro-recomendacion.component';
import { TomarOrdenComponent } from './ventas/tomar-orden/tomar-orden.component';
import { VentasComponent } from './ventas/ventas.component';
import { PagesRoutingModule } from './pages.routing.module';
import { LibroMayorComponent } from './libro-mayor/libro-mayor.component';
import { EntregaInventarioComponent } from './entrega-inventario/entrega-inventario.component';
import { NominasComponent } from './nominas/nominas.component';
import { RegistrarTiempoComponent } from './nominas/registrar-tiempo/registrar-tiempo.component';
import { SueldosComponent } from './nominas/sueldos/sueldos.component';


@NgModule({
  declarations: [
    ClienteComponent,
    DashboardComponent,
    InventarioComponent,
    ProveedorComponent,
    LibroDiarioComponent,
    EmpleadoComponent,
    ComprasComponent,
    ComprobanteCompraComponent,
    DisponibilidadProductoComponent,
    OrdenarProductoComponent,
    RecibirProductoComponent,
    VentasComponent,
    EntregarProductoComponent,
    RegistroRecomendacionComponent,
    TomarOrdenComponent,
    LibroMayorComponent,
    EntregaInventarioComponent,
    NominasComponent,
    RegistrarTiempoComponent,
    SueldosComponent,
  ],
  imports: [
    PagesRoutingModule
  ]
})
export class PagesModule { }
