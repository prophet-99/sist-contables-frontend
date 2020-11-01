import { PagesComponent } from './pages/pages.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { LibroDiarioComponent } from './pages/libro-diario/libro-diario.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
