import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComprasService } from '../../../services/compras.service';
import { ItemByEstado } from '../../../models/items-by-estado.model';
import { EmitterService } from '../../../services/emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disponibilidad-producto-fijos',
  templateUrl: './disponibilidad-producto-fijos.component.html',
  styleUrls: ['./disponibilidad-producto-fijos.component.scss']
})
export class DisponibilidadProductoFijosComponent implements OnInit {

  public itemsSubscription$: Observable<ItemByEstado[]> = null;
  public currentUser: UserAuth = null;
  public listItems: ItemByEstado[] = [];

  constructor(
    private comprasService: ComprasService,
    private authService: AuthService,
    private router: Router,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.itemsSubscription$ = this.comprasService.getAllItemsActivosFijosByEstado();
    this.currentUser = this.authService.currentUser;
  }

  public handleOrden({ target: { checked } }, item: ItemByEstado): void{
    if (checked) this.listItems.push(item);
    // tslint:disable-next-line: curly
    else this.listItems = this.listItems
      .filter( (it) => it.numero_item !== item.numero_item );
  }

  public goOrdenarProductos(): void{
    this.router.navigateByUrl('dashboard/comprasActivosFijos/ordenarProducto');
    setTimeout( (_) =>
      this.emitterService.handleOrdenarProductos$.emit(this.listItems)
    , 20 );
  }
}
