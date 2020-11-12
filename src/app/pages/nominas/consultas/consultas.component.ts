import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nomina } from 'src/app/models/efectivocuenta.model';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SueldosService } from '../../../services/sueldos.service';
import { Nomi } from '../../../models/consulta.model';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  public empleadosSubscription$: Observable<Empleado[]> = null;
  public empleadosNomina$: Observable<Nomi[]> = null;

  constructor(
    private empleadoService: EmpleadoService,
    private sueldosServive: SueldosService
  ) { }

  ngOnInit(): void {
    this.empleadosSubscription$  = this.empleadoService.findAll();
  }

  public cargarNominadeEmpleado({ target: { value } }): void{
    this.empleadosNomina$ = this.sueldosServive.posConsultas(value);
  }

}
