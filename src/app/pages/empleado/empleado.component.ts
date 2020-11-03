import { EmpleadoService } from '../../services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioRequest } from 'src/app/models/requests/usuario.request.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoRequest } from '../../models/requests/empleado.request.model';
import * as moment from 'moment';
declare const $: any;

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public empleadosSubscription$: Observable<Empleado[]> = null;
  public currentEmpleado: Empleado = null;
  public formAuth: FormGroup = null;
  public formEmployee: FormGroup = null;

  constructor(
    private empleadoService: EmpleadoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.empleadosSubscription$  = this.empleadoService.findAll();
    this.formAuth = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
    this.formEmployee = this.formBuilder.group({
      dni: [ '', [ Validators.required ] ],
      fechaNacimiento: [ '', Validators.required ],
      fechaContratacion: [ '', Validators.required ],
      nombres: [ '', Validators.required ],
      apellidos: [ '', Validators.required ],
      tarifaPago: [ null, Validators.required ],
      email: [ '', Validators.required ],
      idCargo: [ null, Validators.required ]
    });
  }

  public chargeCurrentEmpleado(empleado: Empleado): void{
    this.currentEmpleado = empleado;
  }

  public chargeCurrentEmpleadoForAdd(): void{
    this.currentEmpleado = null;
    this.formEmployee = this.formBuilder.group({
      dni: [ '', [ Validators.required ] ],
      fechaNacimiento: [ '', Validators.required ],
      fechaContratacion: [ '', Validators.required ],
      nombres: [ '', Validators.required ],
      apellidos: [ '', Validators.required ],
      tarifaPago: [ null, Validators.required ],
      email: [ '', Validators.required ],
      idCargo: [ null, Validators.required ]
    });
  }

  public chargeCurrentEmpleadoForEdit(empleado: Empleado): void{
    this.currentEmpleado = empleado;
    this.formEmployee = this.formBuilder.group({
      dni: [ empleado.dni, [ Validators.required ] ],
      fechaNacimiento: [ moment(empleado.fecha_nacimiento).format('yyyy-MM-DD'), Validators.required ],
      fechaContratacion: [ moment(empleado.fecha_contratacion).format('yyyy-MM-DD'), Validators.required ],
      nombres: [ empleado.nombres, Validators.required ],
      apellidos: [ empleado.apellidos, Validators.required ],
      tarifaPago: [ empleado.tarifa_pago, Validators.required ],
      email: [ empleado.email, Validators.required ],
      idCargo: [ empleado.rol, Validators.required ]
    });
  }

  public chargeCurrentEmpleadoForAuth(empleado: Empleado): void{
    this.currentEmpleado = empleado;
    this.formAuth.get('username').reset();
    this.formAuth.get('password').reset();
    if (this.currentEmpleado.username) {
      this.formAuth.get('username')
        .reset(this.currentEmpleado.username, [ Validators.required ]);
    }else{
      this.formAuth.get('username').reset(null, [ Validators.required ]);
    }
  }

  public saveUser(): void{
    if (this.formAuth.invalid) return;

    const { username, password } = this.formAuth.value;
    const newUser: UsuarioRequest = {
      idCargo: this.currentEmpleado.id_rol , idEmpleado: this.currentEmpleado.id_empleado ,
      idUsuario: this.currentEmpleado.id_user ? this.currentEmpleado.id_user : 0,
      username, password
    };
    this.empleadoService.saveUsuario(newUser)
      .subscribe(
        ({ msg }) => {
          $('#modal-login').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar usuario', text: err.msg
        })
      );
  }

  public addEmpleado(): void{
    if (this.formEmployee.invalid) {
      const html = `<ul>${ this.getErrors(this.formEmployee) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { dni, fechaNacimiento, fechaContratacion, nombres, apellidos,
      tarifaPago, email, idCargo } = this.formEmployee.value;
    const empleadoReq: EmpleadoRequest = {
      id: (this.currentEmpleado) ? this.currentEmpleado.id_empleado : 0 , 
      dni, fechaContratacion, fechaNacimiento, nombres, apellidos,
      tarifaPago, email, idCargo
    };
    this.empleadoService.save(empleadoReq)
      .subscribe(
        ({ msg }) => {
          $('#modal-add-empleado').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.empleadosSubscription$  = this.empleadoService.findAll();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar usuario', text: err.msg
        })
      );
  }

  public deleteCurrentEmpleado(): void{
    this.empleadoService.deleteById(this.currentEmpleado.id_empleado)
      .subscribe(
        ({ msg }) => {
          $('#modal-delete-empleado').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.empleadosSubscription$  = this.empleadoService.findAll();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al eliminar usuario', text: err.msg
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

  public searchEmpleado({ target: { value } }): void{
    this.empleadosSubscription$ = this.empleadoService.findByNameOrSurname(value);
  }

}
