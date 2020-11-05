import { ClienteService } from '../../../services/cliente.service';
import { VentasService } from '../../../services/ventas.service';
import { ItemByEstado } from '../../../models/items-by-estado.model';
import { Component, OnInit } from '@angular/core';
import { mapTo, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserAuth } from 'src/app/models/user-auth.model';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DetalleDisponibilidad } from 'src/app/models/requests/detalle-disponibilidad.request';
import { EmitterService } from '../../../services/emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-recomendacion',
  templateUrl: './registro-recomendacion.component.html',
  styleUrls: ['./registro-recomendacion.component.scss']
})
export class RegistroRecomendacionComponent implements OnInit {

  public lstItems: any[] = [];
  public ordenForm: FormGroup = null;
  public currentUser: UserAuth = null;
  public currentDate = moment().format('YYYY-MM-DD');
  public lstClientes: any[] = [];
  public currentClient = null;
  public currentIdVerificarDisponibilidad = 0;

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
    this.ordenForm = this.formBuilder.group({
      numeroOrden: [ '', [ Validators.required ] ],
      descripcion: [ '', [ Validators.required ] ],
      fechaPedido: [ this.currentDate, [ Validators.required ] ],
      fechaEsperada: [ this.currentDate, [ Validators.required ] ],
      precioTotalEsperado: [ 0 ],
      idProveedor: [ '' ],
      idEmpleado: [ this.currentUser.idEmpleado ],
      idVerificarDisponibilidad: [ 0 ],
      idNumeroCliente: [ '' ],
      detalleItems: this.formBuilder.array([])
    });
    this.ventasService.getAllItemsEstado()
      .subscribe( (item) =>  this.handlePoblarForm(item) );
    this.clienteService.findAll()
      .subscribe( (cl) => this.lstClientes = cl );
  }

  private handlePoblarForm(items: ItemByEstado[]): void{
    const detalleItemsRef = this.ordenForm.get('detalleItems') as FormArray;
    items.forEach( (item) =>
      detalleItemsRef.push( this.formBuilder.group({
        idNumeroItem: [ item.numero_item ],
        nombreItem: [ item.descripcion ],
        cantidadDisponible: [ item.cantidad_disponible ],
        idVerificarDisponibilidad: [ 0 ],
        descripcion: [ 'Abastecimiento' ],
        costoUnitario: [ item.costo_unitario ],
        costoTotal: [ 0 ],
        puntoReorden: [ item.punto_reorden ],
        cantidadSolicitada: [ 0 ],
        isSelected: [ false ]
      }) )
    );
    this.ordenForm.updateValueAndValidity();
  }

  public get itemsArray(): FormArray{
    return (this.ordenForm) ?
    this.ordenForm.get('detalleItems') as FormArray :
    null;
  }

  public handleCalculateTotal(position: number): void{
    const unitC = this.itemsArray.get([ position, 'costoUnitario' ]).value;
    const cant = this.itemsArray.get([ position, 'cantidadSolicitada' ]).value;
    this.itemsArray.get([ position, 'costoTotal' ]).setValue(unitC * cant);
    let total = 0.0;
    this.itemsArray.value.forEach( (ia) => {
      total += ia.costoTotal;
    });
    this.ordenForm.get('precioTotalEsperado').setValue(total);
    this.ordenForm.updateValueAndValidity();
  }

  public handleBeforePersist(): void{
    this.lstItems = [];
    this.itemsArray.value.forEach( (ia) =>{
      if (ia.isSelected) this.lstItems.push(ia);
    });
  }

  public handleChargeCurrentClient({ target: { value } }): void{
    this.currentClient = this.lstClientes.find( (cc) => cc.id == value );
  }

  public saveOrden(): void{
    if (this.ordenForm.invalid) {
      const html = `<ul>${ this.getErrors(this.ordenForm) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { numeroOrden, descripcion, fechaPedido, fechaEsperada,
    precioTotalEsperado, idProveedor, idEmpleado, idNumeroCliente } = this.ordenForm.value;
    const currentHour = moment().format('HH:mm:ss');
    const currentDate = moment().format('YYYY-MM-DD');

    this.ventasService.postVerificarDisponibilidad(currentHour, currentDate, idEmpleado)
      .pipe(
        mergeMap( ({ idVerificar }) => {
          const detalleItems: DetalleDisponibilidad[] = [];
          this.lstItems.forEach( (ia) =>
            detalleItems.push({ idNumeroItem: ia.idNumeroItem,
            idVerificarDisponibilidad: idVerificar, descripcion: ia.descripcion,
            reorden: false, cantidadSolicitada: ia.cantidadSolicitada })
          );
          return this.ventasService.postDetalleVerificarDisponibilidad({ detalleItems })
            .pipe( mapTo(idVerificar) );
        } ),
        mergeMap( (idVerificar) => {
          this.currentIdVerificarDisponibilidad = idVerificar;
          const regCompra = {
            numeroOrden, descripcion, fechaPedido, fechaEsperada, precioTotalEsperado,
            idProveedor, idEmpleado, idVerificarDisponibilidad: idVerificar
          };
          return this.ventasService.postRecomendacion(
            numeroOrden, descripcion, idVerificar, idNumeroCliente
          );
        }),
        mergeMap( () => {
          const detalleItems: any[] = [];
          this.lstItems.forEach( (ia) =>
            detalleItems.push(
              { idNumeroItem: ia.idNumeroItem, numeroRecomendacion: numeroOrden }
            )
          );
          return this.ventasService.postDetalleRecomendacion({ detalleItems });
        })
      ).subscribe(
        ({ msg }) => {
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.router.navigateByUrl('/dashboard/ventas/tomarOrden');
          setTimeout( () => {
            this.emitterService.handleOrdenarVentas$
              .emit({
                lstItems: this.lstItems,
                currentClient: this.currentClient,
                idVerificarDisponibilidad: this.currentIdVerificarDisponibilidad
              });
          }, 20 );
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar detalle de orden', text: err.msg
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
