import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { Cliente, Welcome } from '../../models/cliente.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteRequest } from '../../models/requests/cliente.request.model';
declare const $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public clienteSubscription$: Observable<Cliente[]> = null;
  public currentCliente: Cliente = null;
  public currentUser: UserAuth = null;
  public formEmployee: FormGroup = null;
  constructor(
  private clientesServices: ClienteService,
  private authService: AuthService,
  private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.clienteSubscription$  = this.clientesServices.findAll();
    this.currentUser = this.authService.currentUser;
    this.formEmployee = this.formBuilder.group({
      dni: ['', [Validators.required]],
      nombre: [ '' , [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      creditoDisponible: ['', [Validators.required]],
      creditoAsignado: ['', [Validators.required]]
    });
  }

  public chargeCurrentEmpleado(cliente: Cliente): void{
    this.currentCliente = cliente;
  }

  public chargeCurrentClienteForAdd(): void{
    this.currentCliente = null;
    this.formEmployee = this.formBuilder.group({
      dni: ['', [Validators.required]],
      nombre: [ '' , [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      creditoDisponible: ['', [Validators.required]],
      creditoAsignado: ['', [Validators.required]]
    });
  }

  public chargeCurrentClienteForEdit(cliente: Cliente): void{
    this.currentCliente = cliente;
    this.formEmployee = this.formBuilder.group({
      dni: [cliente.dni, [Validators.required]],
      nombre: [cliente.nombre, [Validators.required]],
      direccion: [cliente.direccion, [Validators.required]],
      celular: [cliente.celular, [Validators.required]],
      numeroCuenta: [cliente.numero_cuenta, [Validators.required]],
      creditoDisponible: [cliente.credito_disponible, [Validators.required]],
      creditoAsignado: [cliente.credito_asignado, [Validators.required]]
    });
  }

  public addCliente(): void{
    if (this.formEmployee.invalid) {
      const html = `<ul>${ this.getErrors(this.formEmployee) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { dni, nombre, direccion, celular, numeroCuenta,
      creditoDisponible, creditoAsignado} = this.formEmployee.value;
    const clienteRequest: ClienteRequest = {
      id: (this.currentCliente) ? this.currentCliente.id : 0 ,
      dni, nombre, direccion, celular, numeroCuenta,
      creditoDisponible, creditoAsignado
    };
    console.log(clienteRequest);
    this.clientesServices.save(clienteRequest)
    .subscribe(
      ({ msg }) => {
        $('#modal-add-cliente').modal('hide');
        Swal.fire({
          icon: 'success', title: 'Satisfactorio', text: msg
        });
        this.clienteSubscription$  = this.clientesServices.findAll();
      },
      (err) => Swal.fire({
        icon: 'error', title: 'Error al agregar cliente', text: err.msg
      })

    );
  }


  public deleteCurrentCliente(): void{
    this.clientesServices.deleteById(this.currentCliente.id)
    .subscribe(
      ({ msg }) => {
        $('#modal-delete-empleado').modal('hide');
        Swal.fire({
          icon: 'success', title: 'Satisfactorio', text: msg
        });
        this.clienteSubscription$  = this.clientesServices.findAll();
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

  public searchCliente({ target: { value } }): void{
    this.clienteSubscription$ = this.clientesServices.findByNameOrSurname(value);
  }
}
