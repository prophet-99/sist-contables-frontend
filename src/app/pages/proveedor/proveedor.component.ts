import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { UserAuth } from 'src/app/models/user-auth.model';
import Swal from 'sweetalert2';
import { ProveedorRequest } from '../../models/requests/proveedor.request.model';
import { Plazo } from '../../models/plazo.model';
declare const $: any;
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  public proveedorSubscription$: Observable<Proveedor[]> = null;
  public plazoSubscription$: Observable<Plazo[]> = null;
  public currentProveedor: Proveedor = null;
  public formAuth: FormGroup = null;
  public currentUser: UserAuth = null;
  public formEmployee: FormGroup = null;

  constructor(
    private proveedorService: ProveedoresService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.proveedorSubscription$  = this.proveedorService.findAll();
    this.plazoSubscription$ = this.proveedorService.getAllPlazos();
    this.currentUser = this.authService.currentUser;
    this.formEmployee = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      numeroEnviosFallados: ['', [Validators.required]],
      numeroEnviosIncompletos: ['', Validators.required],
      observacionesComerciales: ['', Validators.required],
      idPlazoEntrega: ['', Validators.required]
    });
  }

  public chargeCurrentProveedor(proveedor: Proveedor): void{
    this.currentProveedor = proveedor;
  }

  public chargeCurrentProveedorForAdd(): void{
    this.currentProveedor = null;
    this.formEmployee = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      numeroEnviosFallados: ['', [Validators.required]],
      numeroEnviosIncompletos: ['', Validators.required],
      observacionesComerciales: ['', Validators.required],
      idPlazoEntrega: ['', Validators.required]
    });
  }

  public chargeCurrentProveedorForEdit(proveedor: Proveedor): void{
    this.currentProveedor = proveedor;
    this.formEmployee = this.formBuilder.group({
      nombre: [proveedor.nombre, [Validators.required]],
      direccion: [proveedor.direccion, [Validators.required]],
      ruc: [proveedor.ruc, [Validators.required]],
      numeroCuenta: [proveedor.numero_cuenta, [Validators.required]],
      numeroEnviosFallados: [proveedor.numero_envios_fallados, [Validators.required]],
      numeroEnviosIncompletos: [proveedor.numero_envios_incompletos, Validators.required],
      observacionesComerciales: [proveedor.observaciones_comerciales, Validators.required],
      idPlazoEntrega: [proveedor.plazo_entrega_id, Validators.required]
    });
  }

  public addProveedor(): void{
    if (this.formEmployee.invalid) {
      const html = `<ul>${ this.getErrors(this.formEmployee) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { nombre, direccion, ruc, numeroCuenta, numeroEnviosFallados,
      numeroEnviosIncompletos, observacionesComerciales,
      idPlazoEntrega} = this.formEmployee.value;
    const proveedorRequest: ProveedorRequest = {
      id: (this.currentProveedor) ? this.currentProveedor.id : 0 ,
      nombre, direccion, ruc, numeroCuenta, numeroEnviosFallados,
      numeroEnviosIncompletos, observacionesComerciales,
      idPlazoEntrega
    };
    this.proveedorService.save(proveedorRequest)
      .subscribe(
        ({ msg }) => {
          $('#modal-add-empleado').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.proveedorSubscription$  = this.proveedorService.findAll();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar usuario', text: err.msg
        })
      );
  }

  public deleteCurrentProveedor(): void{
    this.proveedorService.deleteById(this.currentProveedor.id)
    .subscribe(
      ({ msg }) => {
        $('#modal-delete-proveedor').modal('hide');
        Swal.fire({
          icon: 'success', title: 'Satisfactorio', text: msg
        });
        this.proveedorSubscription$  = this.proveedorService.findAll();
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

  public searchProveedor({ target: { value } }): void{
    this.proveedorSubscription$ = this.proveedorService.findByNameOrSurname(value);
  }
}
