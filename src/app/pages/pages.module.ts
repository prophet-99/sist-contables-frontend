import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { ProductosDevueltosComponent } from './ventas/productos-devueltos/productos-devueltos.component';
import { CrearNominaComponent } from './nominas/crear-nomina/crear-nomina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuentasCobrarComponent } from './cuentas-cobrar/cuentas-cobrar.component';
import { CuentasPorPagarComponent } from './cuentas-por-pagar/cuentas-por-pagar.component';
import { ActivosFijosComponent } from './inventario/activos-fijos/activos-fijos.component';
import {
    ComprasActivosFijosComponent
} from './compras-activos-fijos/compras-activos-fijos.component';
import { DisponibilidadProductoFijosComponent } from './compras-activos-fijos/disponibilidad-producto-fijos/disponibilidad-producto-fijos.component';
import {
    OrdenarProductoFijosComponent
} from './compras-activos-fijos/ordenar-producto-fijos/ordenar-producto-fijos.component';
import { DetalleRecomendacionComponent } from './ventas/detalle-recomendacion/detalle-recomendacion.component';
import { ConsultasComponent } from './nominas/consultas/consultas.component';


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
    ProductosDevueltosComponent,
    CrearNominaComponent,
    CuentasCobrarComponent,
    CuentasPorPagarComponent,
    ActivosFijosComponent,
    ComprasActivosFijosComponent,
    DisponibilidadProductoFijosComponent,
    OrdenarProductoFijosComponent,
    DetalleRecomendacionComponent,
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
