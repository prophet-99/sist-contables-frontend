import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegistroRecomendacionComponent } from './ventas/registro-recomendacion/registro-recomendacion.component';
import { TomarOrdenComponent } from './ventas/tomar-orden/tomar-orden.component';
import { EntregarProductoComponent } from './ventas/entregar-producto/entregar-producto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ComprobanteCompraComponent } from './compras/comprobante-compra/comprobante-compra.component';
import { LibroDiarioComponent } from './pages/libro-diario/libro-diario.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { DisponibilidadProductoComponent } from './compras/disponibilidad-producto/disponibilidad-producto.component';
import { RecibirProductoComponent } from './compras/recibir-producto/recibir-producto.component';
import { OrdenarProductoComponent } from './compras/ordenar-producto/ordenar-producto.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { PagesComponent } from './pages/pages.component';


const appRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    children: [
        {path: 'clientes', component: ClienteComponent},
        {path: 'inventario', component: InventarioComponent},
        {path: 'proveedor', component: ProveedorComponent},
        {path: 'diario', component: LibroDiarioComponent},
        {path: 'empleados', component: EmpleadoComponent},
        {path: 'compras',
        component: ComprasComponent,
        children: [
            {path: 'disponibilidad', component: DisponibilidadProductoComponent},
            {path: 'recibirProducto', component: RecibirProductoComponent},
            {path: 'ordenarProducto', component: OrdenarProductoComponent},
            {path: 'comprobanteCompra', component: ComprobanteCompraComponent},
            ]
        },
        {path: 'ventas',
        component: VentasComponent,
        children: [
            {path: 'registroRecomendacion', component: RegistroRecomendacionComponent},
            {path: 'tomarOrden', component: TomarOrdenComponent},
            {path: 'entregarProducto', component: EntregarProductoComponent},
        ]},
    ]

},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
