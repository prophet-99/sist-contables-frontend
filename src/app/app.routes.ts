import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { RegistroRecomendacionComponent } from './pages/registro-recomendacion/registro-recomendacion.component';
import { TomarOrdenComponent } from './pages/tomar-orden/tomar-orden.component';
import { EntregarProductoComponent } from './pages/entregar-producto/entregar-producto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';


const appRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'ventas', component: VentasComponent},
        {path: 'registroRecomendacion', component: RegistroRecomendacionComponent},
        {path: 'tomarOrden', component: TomarOrdenComponent},
        {path: 'entregarProducto', component: EntregarProductoComponent},
        {path: 'clientes', component: ClienteComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
    },
    {path: 'login', component: LoginComponent},
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});