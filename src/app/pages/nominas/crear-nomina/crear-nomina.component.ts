import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SueldoRequest } from '../../../models/requests/sueldo.request.model';
import { SueldosService } from '../../../services/sueldos.service';
import { Sueldos } from '../../../models/sueldos.models';
import { Observable } from 'rxjs';
import { Nominas } from 'src/app/models/descuento.model';
import { Nomina } from 'src/app/models/efectivocuenta.model';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../models/empleado.model';
declare const $: any;

@Component({
  selector: 'app-crear-nomina',
  templateUrl: './crear-nomina.component.html',
  styleUrls: ['./crear-nomina.component.scss']
})
export class CrearNominaComponent implements OnInit {

    /* public sueldoSubscription$: Observable<Sueldos[]> = null; */
    public descuentosSubscription$: Observable<Nominas[]> = null;
    public numerocuentaSubscription$: Observable<Nomina[]> = null;
    public currentSueldo: Sueldos = null;
    public formAuth: FormGroup = null;
    public formEmployee: FormGroup = null;
    public empleados: Empleado[] = [];

  constructor(
    private sueldoService: SueldosService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.empleadoService.findAll().subscribe( (empleados) =>{
      this.empleados = empleados;
      
    });
  }
  public addSueldos(): void{
    if (this.formEmployee.invalid) {
      const html = `<ul>${ this.getErrors(this.formEmployee) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { cantidad, fechaPago, idEmpleado, idNumeroCuenta, saldoBruto,
      fechaNomina, idDescuento } = this.formEmployee.value;
    const saldoReq: SueldoRequest = {
       id: (this.currentSueldo) ? this.currentSueldo.id : 0 ,
      cantidad, fechaPago, idEmpleado, idNumeroCuenta, saldoBruto,
      fechaNomina, idDescuento
    };
    this.sueldoService.save(saldoReq)
      .subscribe(
        ({ msg }) => {
          $('#modal-add-empleado').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.sueldoService.save(saldoReq);
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar usuario', text: err.msg
        })
      );
  }

  public getErrors(fg: FormGroup): string{
    let html = '';

    Object.entries(fg.controls)
      .forEach( ([ key, value ]) => {
        if (value.errors){
          html += `
          <li class="text-left">
            <span class="text-danger">${key}</span>:
            ${Object.keys(value.errors)}
          </li>`;
        }
      } );

    return html;
  }


}
