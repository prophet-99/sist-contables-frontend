import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SueldoRequest } from '../../../models/requests/sueldo.request.model';
import { SueldosService } from '../../../services/sueldos.service';
import { Sueldos } from '../../../models/sueldos.models';
import { Observable } from 'rxjs';
import { Nominas } from 'src/app/models/descuento.model';
import { Nomina } from 'src/app/models/efectivocuenta.model';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../models/empleado.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth.model';
import * as moment from 'moment';
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
    public currentUser: UserAuth = null;
    public nominaForm: FormGroup = null;
    public empleados: Empleado[] = [];

  constructor(
    private sueldoService: SueldosService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.empleadoService.findAll().subscribe( (empleados) =>{
      this.empleados = empleados;
    });
    this.descuentosSubscription$ = this.sueldoService.getAllDescuentos();
    this.numerocuentaSubscription$ = this.sueldoService.getdAllNumeroCuenta();
    this.nominaForm = this.formBuilder.group({
      cantidad: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]],
      idEmpleado: ['', [Validators.required]],
      idNumeroCuenta: [null, [Validators.required]],
      saldoBruto: ['', [Validators.required]],
      fechaNomina: ['', [Validators.required]],
      idDescuento: [null, [Validators.required]]
    });
  }

  public chargeCurrentNomina(sueldo: Sueldos): void{
    this.currentSueldo = sueldo;
  }

/*   public chargeCurrentNominaForAdd(): void{
    this.currentSueldo = null;
    this.nominaForm = this.formBuilder.group({
      cantidad: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]],
      idEmpleado: ['', [Validators.required]],
      idNumeroCuenta: ['', [Validators.required]],
      saldoBruto: ['', [Validators.required]],
      fechaNomina: ['', [Validators.required]],
      idDescuento: ['', [Validators.required]]
    });
  } */
/* 
  public chargeCurrentNominaForEdit(sueldo: Sueldos): void{
    this.currentSueldo = sueldo;
    this.nominaForm = this.formBuilder.group({
      cantidad: [sueldo.cantidad, [Validators.required]],
      fechaPago: [sueldo.fecha_pago, moment(sueldo.fecha_pago).format('yyyy-MM-DD'), [Validators.required]],
      idEmpleado: [sueldo.id_empleado, [Validators.required]],
      idNumeroCuenta: [sueldo.id_numero_cuenta, [Validators.required]],
      saldoBruto: [sueldo.saldo_bruto, [Validators.required]],
      fechaNomina: [sueldo.fecha_nomina, moment(sueldo.fecha_nomina).format('yyyy-MM-DD'), [Validators.required]],
      idDescuento: [sueldo.id, [Validators.required]]
    });
  } */

  public addNomina(): void{
    if (this.nominaForm.invalid) {
      const html = `<ul>${ this.getErrors(this.nominaForm) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { cantidad, fechaPago, idEmpleado, idNumeroCuenta, saldoBruto,
      fechaNomina, idDescuento } = this.nominaForm.value;
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
