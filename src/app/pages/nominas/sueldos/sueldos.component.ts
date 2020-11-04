import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SueldoRequest } from '../../../models/requests/sueldo.request.model';
import { SueldosService } from '../../../services/sueldos.service';
import { Sueldos } from '../../../models/sueldos.models';
import { Observable } from 'rxjs';
declare const $: any;
@Component({
  selector: 'app-sueldos',
  templateUrl: './sueldos.component.html',
  styleUrls: ['./sueldos.component.scss']
})
export class SueldosComponent implements OnInit {

  
  public sueldoSubscription$: Observable<Sueldos[]> = null;
/*   public descuentosSubscription$: Observable<Descuentos[]> = null;
 */  public currentSueldo: Sueldos = null;
  public formAuth: FormGroup = null;
  public formEmployee: FormGroup = null;

  constructor(
    private sueldoService: SueldosService,
  ) { }

  ngOnInit(): void {
  }

  public addEmpleado(): void{
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
/*       id: (this.currentSueldo) ? this.currentSueldo.id : 0 ,
 */      cantidad, fechaPago, idEmpleado, idNumeroCuenta, saldoBruto,
      fechaNomina, idDescuento
    };
    this.sueldoService.save(saldoReq)
      .subscribe(
        ({ msg }) => {
          $('#modal-add-empleado').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.sueldoSubscription$  = this.sueldoService.findAll();
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
