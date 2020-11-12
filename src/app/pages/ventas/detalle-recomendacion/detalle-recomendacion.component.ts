import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recomendacion } from 'src/app/models/getdetallerecomendacion.model';
import { VentasService } from 'src/app/services/ventas.service';
import { Ite } from '../../../models/detalle-recomendacion.model';

@Component({
  selector: 'app-detalle-recomendacion',
  templateUrl: './detalle-recomendacion.component.html',
  styleUrls: ['./detalle-recomendacion.component.scss']
})
export class DetalleRecomendacionComponent implements OnInit {

  public clienteRecomendacion: Ite[] = [];
  public recomendacionSubscription$: Observable<Recomendacion[]> = null;
  public currentRecomendacionVenta: Recomendacion = null;
  constructor(
    private ventasService: VentasService,
  ) { }

  ngOnInit(): void {
    this.recomendacionSubscription$  = this.ventasService.getRecomendacionCliente();
  }

  public detalleRecomendacionProductos(recomendacionVenta: Recomendacion): void{
    this.currentRecomendacionVenta = recomendacionVenta;
    this.ventasService.getRecomendacionID(recomendacionVenta.numero_recomendacion)
      .subscribe( (items) => this.clienteRecomendacion = items );
  }

}
