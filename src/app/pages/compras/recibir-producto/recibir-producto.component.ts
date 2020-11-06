import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { OrdenCompra } from 'src/app/models/ordenes-compra.model';
import * as moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { UserAuth } from 'src/app/models/user-auth.model';
import { OrdenCompraDetalle } from 'src/app/models/ordenes-compra-detalle.model';
import { FormArray } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { mergeMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RecepcionarCompraRequest } from 'src/app/models/requests/recepcionar-compra.request';
import { DetalleRecepcionRequest } from 'src/app/models/requests/detalle-recepcion.request';
import { DetalleRecepcion } from '../../../models/requests/detalle-recepcion.request';

@Component({
  selector: 'app-recibir-producto',
  templateUrl: './recibir-producto.component.html',
  styleUrls: ['./recibir-producto.component.scss']
})
export class RecibirProductoComponent implements OnInit {

  public ordenesCompraArr: OrdenCompra[] = [];
  public currentOrdenCompra: OrdenCompra = null;
  public currentDetalleOrdenCompra: OrdenCompraDetalle[] = [];
  public currentDate = moment().format('YYYY-MM-DD');
  public currentUser: UserAuth = null;
  public recepcionForm: FormGroup = null;

  constructor(
    private comprasService: ComprasService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comprasService.getOrdenesCompra()
      .subscribe( (items) => this.ordenesCompraArr = items );
    this.currentUser = this.authService.currentUser;
    this.recepcionForm = this.formBuilder.group({
      numeroComprobante: [ '', [ Validators.required ] ],
      numeroReciboInventario: [ '', [ Validators.required ] ],
      montoAdeuda: [ '', [ Validators.required ] ],
      transportista: [ '', [ Validators.required ] ],
      idCodigoFactura: [ '', [ Validators.required ] ],
      detalleItems: this.formBuilder.array([])
    });
  }

  public handleChargeRecibo({ target: { value } }): void{
    this.currentOrdenCompra = this.ordenesCompraArr
      .find( (oc) => oc.numero_orden_compra === value );
    this.comprasService.getOrdenesCompraDetalle(value)
      .pipe(
        tap( (items) => this.handlePoblarForm(items) )
      ).subscribe( (items) => this.currentDetalleOrdenCompra = items );
    this.recepcionForm.get('idCodigoFactura').setValue(
      (this.currentOrdenCompra.proveedor_factura) ? this.currentOrdenCompra.proveedor_factura : ''
    );
    this.recepcionForm.updateValueAndValidity();
  }

  private handlePoblarForm(items: OrdenCompraDetalle[]): void{
    const detalleItemsRef = this.recepcionForm.get('detalleItems') as FormArray;
    detalleItemsRef.clear();
    items.forEach( (item) =>
      detalleItemsRef.push( this.formBuilder.group({
        idNumeroItem: [ item.id_numero_item ],
        producto: [ item.producto ],
        cantidadPedida: [ item.cantidad_orden ],
        cantidadRecibida: [ '', [ Validators.required ] ],
        costoUnitarioActual: [ item.precio_unitario_compra, [ Validators.max(item.cantidad_orden) ] ],
        observacion: [ 'Recepcion y verificación de productos' ],
        estadoRecepcion: [ false, [ Validators.required ] ]
      }) )
    );
    this.recepcionForm.updateValueAndValidity();
  }

  public get itemsArray(): FormArray{
    return (this.recepcionForm) ?
    this.recepcionForm.get('detalleItems') as FormArray :
    null;
  }

  public printSection(): void{
    window.print();
  }

  public handleCalculateTotal(position: number): void{
    // TODO: REVISAR EL ALGORITMO EN OTROS COMPONENTES
    let total = 0;
    this.itemsArray.value.forEach( (ia) => {
      total += ia.cantidadRecibida * ia.costoUnitarioActual;
    });
    total = this.currentOrdenCompra.precio_total_esperado - total;
    this.recepcionForm.get('montoAdeuda').setValue(`$ ${ total }.00`);
    this.recepcionForm.updateValueAndValidity();
  }

  public saveRegister(): void{
    if (this.recepcionForm.invalid) {
      const html = `<ul>${ this.getErrors(this.recepcionForm) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }
    const {
      idCodigoFactura, numeroComprobante, numeroReciboInventario,
      montoAdeuda, transportista
     } = this.recepcionForm.value;
    const montoAdeudaFormat = montoAdeuda.split('.')[0].split('$ ')[1];

    if (!this.currentOrdenCompra.proveedor_factura){
      this.comprasService.postFactura(idCodigoFactura)
        .subscribe(
          ({ msg }) => console.log(msg),
          (err) => Swal.fire({
            icon: 'error', title: 'Error al agregar factura', text: err.msg
          })
        );
    }
    const fechaRecepcion = moment().format('YYYY-MM-DD');
    const recepcCompra: RecepcionarCompraRequest =  {
      idCodigoFactura, fechaRecepcion, idEmpleado: this.currentUser.idEmpleado,
      idNumeroOrdenCompra: this.currentOrdenCompra.numero_orden_compra , idProveedor: this.currentOrdenCompra.id_proveedor,
      montoAdeuda: montoAdeudaFormat, numeroComprobante,
      numeroReciboInventario: `PR-FR-INV-${ numeroReciboInventario }`, transportista
    };
    const detalleItems: DetalleRecepcion[] = [];
    this.itemsArray.value.forEach( (ia) =>
      detalleItems.push({ idNumeroItem: ia.idNumeroItem, idNumeroComprobante: numeroComprobante,
        cantidadRecibida: ia.cantidadRecibida, costoUnitarioActual: ia.costoUnitarioActual,
        observacion: ia.observacion, estado_recepcion: ia.estadoRecepcion })
    );
    this.comprasService.postRecepcionarCompra(recepcCompra)
      .pipe(
        mergeMap( (_) => this.comprasService.postRecepcionarDetalleCompra({ detalleItems }) )
      ).subscribe(
        ({ msg }) => {
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.recepcionForm.reset();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar registro de inventario', text: err.msg
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
