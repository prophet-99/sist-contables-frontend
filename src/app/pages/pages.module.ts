import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteComponent } from './cliente/cliente.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { EmpleadoComponent } from './empleado/empleado.component';


@NgModule({
  declarations: [
    ClienteComponent,
    DashboardComponent,
     InventarioComponent,
     ProveedorComponent,
     LibroDiarioComponent,
     EmpleadoComponent
    ],
    exports: [
      ClienteComponent,
      DashboardComponent,
       InventarioComponent,
       ProveedorComponent,
       LibroDiarioComponent,
       EmpleadoComponent
    ],
})
export class PagesModule { }
