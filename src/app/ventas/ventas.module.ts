import { NgModule } from '@angular/core';
import { EntregarProductoComponent } from '../ventas/entregar-producto/entregar-producto.component';
import { RegistroRecomendacionComponent } from '../ventas/registro-recomendacion/registro-recomendacion.component';
import { TomarOrdenComponent } from '../ventas/tomar-orden/tomar-orden.component';



@NgModule({
  declarations: [
    EntregarProductoComponent,
    RegistroRecomendacionComponent,
     TomarOrdenComponent,
    ],
    exports: [
      EntregarProductoComponent,
      RegistroRecomendacionComponent,
       TomarOrdenComponent,
    ],
})
export class VentasModule { }