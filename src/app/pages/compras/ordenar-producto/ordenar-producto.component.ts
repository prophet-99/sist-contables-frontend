import { EmitterService } from '../../../services/emitter.service';
import { Component, OnInit } from '@angular/core';
import { ItemByEstado } from 'src/app/models/items-by-estado.model';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-ordenar-producto',
  templateUrl: './ordenar-producto.component.html',
  styleUrls: ['./ordenar-producto.component.scss']
})
export class OrdenarProductoComponent implements OnInit {

  public listItems: ItemByEstado[] = [];
  public ordenForm: FormGroup = null;

  constructor(
    private emitterService: EmitterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emitterService.handleOrdenarProductos$
      .pipe(
        tap( (lstItems) =>  this.handlePoblarForm(lstItems) )
      ).subscribe( (lstItems) => this.listItems = lstItems );
  }

  private handlePoblarForm(items: ItemByEstado[]): void{
    console.log(items)
    this.ordenForm = this.formBuilder.group({
      detalleItems: this.formBuilder.array([])
    });
    this.ordenForm.updateValueAndValidity();
    console.log("aajaj", this.ordenForm.get('detalleItems'))
    const detalleItems = this.ordenForm.get('detalleItems') as FormArray;
    this.listItems.forEach( (item) =>
      detalleItems.push( this.formBuilder.group({
        idNumeroItem: [ item.numero_item, [ Validators.required ] ],
        idVerificarDisponibilidad: [ 0 ],
        descripcion: [ 'Abastecimiento' ],
        reorden: [ item.punto_reorden >= item.cantidad_disponible ], // *Si necesitaba reordenar o no
        cantidadSolicitada: [ 0, [ Validators.required, Validators.min(item.punto_reorden) ] ]
      }) )
    );
    this.ordenForm.updateValueAndValidity();
    console.log(this.ordenForm)
  }

  public printSection(): void{
    window.print();
  }

  public saveOrden(): void{

  }
}
