import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsByEstado } from 'src/app/models/items-by-estado.model';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComprasService } from '../../../services/compras.service';

@Component({
  selector: 'app-disponibilidad-producto',
  templateUrl: './disponibilidad-producto.component.html',
  styleUrls: ['./disponibilidad-producto.component.scss']
})
export class DisponibilidadProductoComponent implements OnInit {

  public lstItems = [];
  public currentUser: UserAuth = null;

  constructor(
    private compraService: ComprasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.compraService.getAllItemsEstado()
      .subscribe( ({ items }) => this.lstItems = items );
    this.currentUser = this.authService.currentUser;
  }

}
