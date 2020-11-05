import { EmitterService } from '../../../services/emitter.service';
import { FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { AuthService } from '../../../services/auth.service';
import { VentasService } from '../../../services/ventas.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ItemByEstado } from '../../../models/items-by-estado.model';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tomar-orden',
  templateUrl: './tomar-orden.component.html',
  styleUrls: ['./tomar-orden.component.scss']
})
export class TomarOrdenComponent implements OnInit {

  public lstItems: any[] = [];
  public ordenForm: FormGroup = null;
  public currentUser: UserAuth = null;
  public currentDate = moment().format('YYYY-MM-DD');
  public currentClient = null;
  public idVerificarDisponibilidad = 0;

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

    this.emitterService.handleOrdenarVentas$
      .pipe(
        tap( ({ lstItems }) => this.handlePoblarForm(lstItems) ),
        tap( ({ currentClient }) => this.currentClient = currentClient ),
        tap( ({ idVerificarDisponibilidad }) => this.idVerificarDisponibilidad = idVerificarDisponibilidad ),
        tap(console.log)
      ).subscribe( ({ lstItems }) => this.lstItems = lstItems );
  }

  private handlePoblarForm(items: any[]): void{
    const detalleItemsRef = this.ordenForm.get('detalleItems') as FormArray;
    items.forEach( (item) =>
      detalleItemsRef.push( this.formBuilder.group({
        idNumeroItem: [ item.idNumeroItem ],
        nombreItem: [ item.descripcion ],
        cantidadDisponible: [ item.cantidadDisponible ],
        idVerificarDisponibilidad: [ 0 ],
        descripcion: [ 'Abastecimiento' ],
        costoUnitario: [ item.costoUnitario ],
        costoTotal: [ 0 ],
        puntoReorden: [ item.puntoReorden ],
        cantidadSolicitadaAnt: [ item.cantidadSolicitada ],
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
}
