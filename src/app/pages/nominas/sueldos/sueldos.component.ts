import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { SalariospordescuentosService } from '../../../services/salariospordescuentos.service';

declare const $: any;

@Component({
  selector: 'app-sueldos',
  templateUrl: './sueldos.component.html',
  styleUrls: ['./sueldos.component.scss']
})
export class SueldosComponent implements OnInit {


  public salariospordescuentoSubscription$: Observable<any> = null;
  public currentUser: UserAuth = null;


  constructor(
    private salariospordescuento: SalariospordescuentosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.salariospordescuentoSubscription$  = this.salariospordescuento.getAllSalariosPorDescuentos();
    this.currentUser = this.authService.currentUser;
  }
  public printSection(): void{
    window.print();
  }

}
