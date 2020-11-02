import { EmpleadoService } from '../../services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioRequest } from 'src/app/models/requests/usuario.model';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public empleadosSubscription$ = null;
  public currentEmpleado = null;
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
  }

  public chargeCurrentEmpleado(empleado): void{
    this.currentEmpleado = empleado;
  }

  public chargeCurrentEmpleadoByAuth(empleado): void{
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
        (msg) => {
          $('#modal-login').modal('hide');
          Swal.fire({
            icon: 'success',
            title: 'Satisfactorio',
            text: 'Usuario agregado correctamente'
          })
        },
        (err) => Swal.fire({
          icon: 'error',
          title: 'Error al agregar usuario',
          text: err.msg
        })
      );
  }

}
