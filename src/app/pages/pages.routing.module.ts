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

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'clientes', component: ClienteComponent },
            { path: 'inventario', component: InventarioComponent },
            { path: 'proveedor', component: ProveedorComponent },
            { path: 'diario', component: LibroDiarioComponent },
            { path: 'empleados', component: EmpleadoComponent },
            { path: 'compras', component: ComprasComponent,
                children: [
                    { path: '', redirectTo: 'disponibilidad', pathMatch: 'full' },
                    { path: 'disponibilidad', component: DisponibilidadProductoComponent },
                    { path: 'recibirProducto', component: RecibirProductoComponent },
                    { path: 'ordenarProducto', component: OrdenarProductoComponent },
                    { path: 'comprobanteCompra', component: ComprobanteCompraComponent },
                ]
            },
            { path: 'ventas', component: VentasComponent,
                children: [
                    { path: '', redirectTo: 'registroRecomendacion', pathMatch: 'full' },
                    { path: 'registroRecomendacion', component: RegistroRecomendacionComponent },
                    { path: 'tomarOrden', component: TomarOrdenComponent },
                    { path: 'entregarProducto', component: EntregarProductoComponent },
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