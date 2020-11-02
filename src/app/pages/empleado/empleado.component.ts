import { EmpleadoService } from '../../services/empleado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public empleadosSubscription$ = null;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadosSubscription$  = this.empleadoService.findAll();
  }

}
