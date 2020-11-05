import { TransaccionesService } from '../../services/transacciones.service';
import { GeneralLedger } from '../../models/general-ledger.model';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.component.html',
  styleUrls: ['./libro-diario.component.scss']
})
export class LibroDiarioComponent implements OnInit {

  public generalLedger: GeneralLedger[] = [];
  public currentTotal =  0;

  constructor(
    private transaccionesService: TransaccionesService
  ) { }

  ngOnInit(): void {
    this.transaccionesService.getGeneralLedger()
      .pipe(
        tap( (ts) => ts.map( t => this.currentTotal += (t.debe - t.haber) ) )
      ).subscribe( (gl) => this.generalLedger = gl );
  }

}
