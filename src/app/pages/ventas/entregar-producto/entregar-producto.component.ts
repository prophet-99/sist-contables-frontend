import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { VentasService } from '../../../services/ventas.service';
import { AuthService } from '../../../services/auth.service';
import { EmitterService } from '../../../services/emitter.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserAuth } from 'src/app/models/user-auth.model';

@Component({
  selector: 'app-entregar-producto',
  templateUrl: './entregar-producto.component.html',
  styleUrls: ['./entregar-producto.component.scss']
})
export class EntregarProductoComponent implements OnInit {

  public listItems: any[] = [];
  public currentClient = null;
  public idVerificarDisponibilidad = 0;
  public currentUser: UserAuth = null;
  public ordenForm: FormGroup = null;
  public idNumeroOrden = '';

   constructor(
    private clienteService: ClienteService,
    private ventasService: VentasService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.emitterService.handleOrdenarVentas$
      .pipe(
        tap( ({ lstItems }) => this.listItems = lstItems ),
        tap( ({ idNumeroOrden }) => this.idNumeroOrden = idNumeroOrden ),
        tap( ({ currentClient }) => this.currentClient = currentClient ),
        tap( ({ idVerificarDisponibilidad }) => this.idVerificarDisponibilidad = idVerificarDisponibilidad ),
        tap(console.log)
      ).subscribe();
    this.ordenForm = this.formBuilder.group({
      importe: [ '', [ Validators.required ] ],
      fechaEnvio: [ '', [ Validators.required ] ],
      fechaCierre: [ '', [ Validators.required ] ],
      numeroComprobante: [ '', [ Validators.required ] ],
      idCodigoFacturaCliente: [ '', [ Validators.required ] ],
      idNumeroCliente: [ 0 ],
      idEmpleado: [ 0 ],
      idNumeroOrden: [ 0 ],
    });
  }

  public saveOrden(): void{
    if (this.ordenForm.invalid) {
      const html = `<ul>${ this.getErrors(this.ordenForm) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { importe, fechaEnvio, fechaCierre, numeroComprobante,
      idNumeroCliente, idEmpleado, idNumeroOrden, idCodigoFacturaCliente } = this.ordenForm.value;
    const items: any[] = [];
    this.listItems.forEach( (ia) =>
      items.push({ importe, fechaEnvio, fechaCierre, numeroComprobante,
        idNumeroCliente: this.currentClient.id,
        idEmpleado: this.currentUser.idEmpleado,
        idNumeroOrden: this.idNumeroOrden, idCodigoFacturaCliente
      })
    );
    this.ventasService.postEnviarItems({ items })
    .subscribe(
        ({ msg }) => {
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.router.navigateByUrl('/dashboard/ventas/registroRecomendacion');
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar detalle de envio', text: err.msg
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
