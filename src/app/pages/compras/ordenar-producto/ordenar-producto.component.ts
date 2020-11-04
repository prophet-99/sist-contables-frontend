import { EmitterService } from '../../../services/emitter.service';
import { Component, OnInit } from '@angular/core';
import { ItemByEstado } from 'src/app/models/items-by-estado.model';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth.model';
import { ProveedoresService } from '../../../services/proveedores.service';
import { FormArray } from '@angular/forms';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ComprasService } from '../../../services/compras.service';
import * as moment from 'moment';
import {
    DetalleDisponibilidadRequest,
    DetalleDisponibilidad
} from '../../../models/requests/detalle-disponibilidad.request';
import { RegistrarCompraRequest } from '../../../models/requests/registrar-compra.request';
import { DetalleOrden, DetalleOrdenRequest } from 'src/app/models/requests/detalle-orden.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenar-producto',
  templateUrl: './ordenar-producto.component.html',
  styleUrls: ['./ordenar-producto.component.scss']
})
export class OrdenarProductoComponent implements OnInit {

  public lstItems: ItemByEstado[] = [];
  public ordenForm: FormGroup = null;
  public currentUser: UserAuth = null;
  public lstProveedores: Proveedor[] = [];
  public currentProveedor: Proveedor = null;

  constructor(
    private emitterService: EmitterService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private proveedorService: ProveedoresService,
    private comprasService: ComprasService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.ordenForm = this.formBuilder.group({
      numeroOrden: [ '', [ Validators.required ] ],
      descripcion: [ '', [ Validators.required ] ],
      fechaPedido: [ '', [ Validators.required ] ],
      fechaEsperada: [ '', [ Validators.required ] ],
      precioTotalEsperado: [ 0 ],
      idProveedor: [ '' ],
      idEmpleado: [ this.currentUser.idEmpleado ],
      idVerificarDisponibilidad: [ 0 ],
      detalleItems: this.formBuilder.array([])
    });
    this.emitterService.handleOrdenarProductos$
      .pipe(
        tap( (lstItems) =>  this.handlePoblarForm(lstItems) )
      ).subscribe( (lstItems) => this.lstItems = lstItems );
    this.proveedorService.findAll()
        .subscribe(( proveedores ) => this.lstProveedores = proveedores);
  }

  private handlePoblarForm(items: ItemByEstado[]): void{
    const detalleItemsRef = this.ordenForm.get('detalleItems') as FormArray;
    items.forEach( (item) =>
      detalleItemsRef.push( this.formBuilder.group({
        idNumeroItem: [ item.numero_item, [ Validators.required ] ],
        nombreItem: [ item.descripcion ],
        cantidadDisponible: [ item.cantidad_disponible ],
        idVerificarDisponibilidad: [ 0 ],
        descripcion: [ 'Abastecimiento' ],
        costoUnitario: [ 0, [ Validators.required, Validators.min(1) ] ],
        costoTotal: [ 0, [ Validators.required, Validators.min(1) ] ],
        puntoReorden: [ item.punto_reorden ],
        reorden: [ item.punto_reorden >= item.cantidad_disponible ], // *Si necesitaba reordenar o no
        cantidadSolicitada: [ 0, [ Validators.required, Validators.min(item.punto_reorden) ] ]
      }) )
    );
    this.ordenForm.updateValueAndValidity();
  }

  public printSection(): void{
    window.print();
  }

  public get itemsArray(): FormArray{
    return (this.ordenForm) ?
    this.ordenForm.get('detalleItems') as FormArray :
    null;
  }

  public handleSetCurrentSupplier({ target: { value } }): void{
    this.currentProveedor = this.lstProveedores.find( (p) => p.id == value );
    console.log(this.currentProveedor, value);
    console.log(this.ordenForm);
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

  public saveOrden(): void{
    if (this.ordenForm.invalid) {
      const html = `<ul>${ this.getErrors(this.ordenForm) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const { numeroOrden, descripcion, fechaPedido, fechaEsperada,
    precioTotalEsperado, idProveedor, idEmpleado } = this.ordenForm.value;
    const currentHour = moment().format('HH:mm:ss');
    const currentDate = moment().format('YYYY-MM-DD');

    this.comprasService.postVerificarDisponibilidad(currentHour, currentDate, idEmpleado)
      .pipe(
        mergeMap( ({ idVerificar }) => {
          const detalleItems: DetalleDisponibilidad[] = [];
          this.itemsArray.value.forEach( (ia) =>
            detalleItems.push({ idNumeroItem: ia.idNumeroItem,
            idVerificarDisponibilidad: idVerificar, descripcion: ia.descripcion,
            reorden: ia.reorden, cantidadSolicitada: ia.cantidadSolicitada })
          );
          return this.comprasService.postDetalleVerificarDisponibilidad({ detalleItems })
            .pipe( mapTo(idVerificar) );
        } ),
        mergeMap( (idVerificar) => {
          const regCompra: RegistrarCompraRequest = {
            numeroOrden, descripcion, fechaPedido, fechaEsperada, precioTotalEsperado,
            idProveedor, idEmpleado, idVerificarDisponibilidad: idVerificar
          };
          return this.comprasService.postRegistrarCompra(regCompra)
            .pipe( mapTo(numeroOrden) );
        }),
        mergeMap( (idNumeroOrdenCompra) => {
          const ordenarItems: DetalleOrden[] = [];
          this.itemsArray.value.forEach( (ia) =>
            ordenarItems.push({ idNumeroItem: ia.idNumeroItem, idNumeroOrdenCompra,
            cantidad: ia.cantidadSolicitada, precioUnitarioCompra: ia.costoUnitario })
          );
          return this.comprasService.postRegistrarDetalleOrden({ ordenarItems });
        })
      ).subscribe(
        ({ msg }) => {
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
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
