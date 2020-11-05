import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ComprasComponent } from './compras/compras.component';
import {
    DisponibilidadProductoComponent
} from './compras/disponibilidad-producto/disponibilidad-producto.component';
import { RecibirProductoComponent } from './compras/recibir-producto/recibir-producto.component';
import { OrdenarProductoComponent } from './compras/ordenar-producto/ordenar-producto.component';
import {
    ComprobanteCompraComponent
} from './compras/comprobante-compra/comprobante-compra.component';
import { VentasComponent } from './ventas/ventas.component';
import { RegistroRecomendacionComponent } from './ventas/registro-recomendacion/registro-recomendacion.component';
import { TomarOrdenComponent } from './ventas/tomar-orden/tomar-orden.component';
import { EntregarProductoComponent } from './ventas/entregar-producto/entregar-producto.component';
import { LibroMayorComponent } from './libro-mayor/libro-mayor.component';
import { EntregaInventarioComponent } from './entrega-inventario/entrega-inventario.component';
import { NominasComponent } from './nominas/nominas.component';
import { RegistrarTiempoComponent } from './nominas/registrar-tiempo/registrar-tiempo.component';
import { SueldosComponent } from './nominas/sueldos/sueldos.component';
import { ProductosDevueltosComponent } from './ventas/productos-devueltos/productos-devueltos.component';
import { CrearNominaComponent } from './nominas/crear-nomina/crear-nomina.component';
import { AuthGuard } from '../guards/auth.guard';
import { CuentasCobrarComponent } from './cuentas-cobrar/cuentas-cobrar.component';
import { CuentasPorPagarComponent } from './cuentas-por-pagar/cuentas-por-pagar.component';
import { ActivosFijosComponent } from './inventario/activos-fijos/activos-fijos.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canActivateChild: [ AuthGuard ],
        children: [
            { path: 'clientes', component: ClienteComponent },
            { path: 'inventario', component: InventarioComponent },
            { path: 'inventarioactivosfijos', component: ActivosFijosComponent },
            { path: 'proveedor', component: ProveedorComponent },
            { path: 'diario', component: LibroDiarioComponent },
            { path: 'mayor', component: LibroMayorComponent },
            {path: 'cuentasPorCobra', component: CuentasCobrarComponent},
            {path: 'cuentasPorPagar', component: CuentasPorPagarComponent},
            { path: 'empleados', component: EmpleadoComponent },
            { path: 'nominas' , component: NominasComponent,
                children: [
                    { path: '', redirectTo: 'crearNomina', pathMatch: 'full' },
                    {path: 'crearNomina', component: CrearNominaComponent},
                    {path: 'registrarTiempo', component: RegistrarTiempoComponent},
                    {path: 'sueldos', component: SueldosComponent},
                ]},
            { path: 'entregaInventario', component: EntregaInventarioComponent},
            { path: 'compras', component: ComprasComponent,
                children: [
                    { path: '', redirectTo: 'disponibilidad', pathMatch: 'full' },
                    { path: 'disponibilidad', component: DisponibilidadProductoComponent },
                    { path: 'ordenarProducto', component: OrdenarProductoComponent },
                ]
            },
            { path: 'comprasRecibirProductos', component: RecibirProductoComponent },
            { path: 'comprasComprobanteCompra', component: ComprobanteCompraComponent },
            { path: 'ventas', component: VentasComponent,
                children: [
                    { path: '', redirectTo: 'registroRecomendacion', pathMatch: 'full' },
                    { path: 'registroRecomendacion', component: RegistroRecomendacionComponent },
                    { path: 'tomarOrden', component: TomarOrdenComponent },
                    { path: 'entregarProducto', component: EntregarProductoComponent },
                    { path: 'productosDevueltos', component: ProductosDevueltosComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PagesRoutingModule { }