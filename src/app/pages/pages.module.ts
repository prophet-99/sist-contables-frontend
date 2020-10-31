import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { RegistroRecomendacionComponent } from './registro-recomendacion/registro-recomendacion.component';
import { ClienteComponent } from './cliente/cliente.component';


@NgModule({
  declarations: [
    DashboardComponent,
     VentasComponent,
     RegistroRecomendacionComponent,
     ClienteComponent
    ],
    exports: [
      DashboardComponent,
      VentasComponent,
      RegistroRecomendacionComponent,
      ClienteComponent
    ],
})
export class PagesModule { }
