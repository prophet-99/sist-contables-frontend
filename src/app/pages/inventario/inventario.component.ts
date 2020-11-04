import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/inventario.model';
import { Categoria } from '../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth } from 'src/app/models/user-auth.model';
import { InventarioService } from '../../services/inventario.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ItemRequest } from 'src/app/models/requests/inventario.request.model';
declare const $: any;
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  public inventarioSubscription$: Observable<Item[]> = null;
  public categoriaSubscription$: Observable<Categoria[]> = null;
  public currentInventario: Item = null;
  public formAuth: FormGroup = null;
  public currentUser: UserAuth = null;
  public formEmployee: FormGroup = null;

  constructor(
    private inventarioService: InventarioService ,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inventarioSubscription$  = this.inventarioService.findAll();
    this.categoriaSubscription$ = this.inventarioService.getAllCategoria();
    this.currentUser = this.authService.currentUser;
    this.formEmployee = this.formBuilder.group({
      numeroItem: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      cantidadDiponible: ['', [Validators.required]],
      puntoReorden: ['', [Validators.required]],
      costoUnitario: ['', Validators.required],
      tasaUso: ['', Validators.required],
      idCategoria: ['', Validators.required],
      action: ['C', Validators.required]
    });
  }

  public chargeCurrentInventario(items: Item): void{
    this.currentInventario = items;
  }

  public chargeCurrentInventarioForAdd(): void{
    this.currentInventario = null;
    this.formEmployee = this.formBuilder.group({
      numeroItem: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      cantidadDiponible: ['', [Validators.required]],
      puntoReorden: ['', [Validators.required]],
      costoUnitario: ['', Validators.required],
      tasaUso: ['', Validators.required],
      idCategoria: ['', Validators.required],
      action: ['C', Validators.required]
    });
  }

  public chargeCurrentInventarioForEdit(item: Item): void{
    this.currentInventario = item;
    this.formEmployee = this.formBuilder.group({
      numeroItem: [item.numero_item, [Validators.required]],
      descripcion: [item.item, [Validators.required]],
      ubicacion: [item.ubicacion, [Validators.required]],
      cantidadDiponible: [item.cantidad_disponible, [Validators.required]],
      puntoReorden: [item.punto_reorden, [Validators.required]],
      costoUnitario: [item.costo_unitario, Validators.required],
      tasaUso: [item.tasa_uso, Validators.required],
      idCategoria: [item.categoria, Validators.required],
      action: ['E', Validators.required]
    });
  }
  public addInventario(): void{
    if (this.formEmployee.invalid) {
      const html = `<ul>${ this.getErrors(this.formEmployee) }</ul>`;
      Swal.fire({
        icon: 'error', html
      });
      return;
    }const{ numeroItem, descripcion, ubicacion, cantidadDiponible, puntoReorden, costoUnitario, tasaUso, idCategoria, action} = this.formEmployee.value;
    const inventarioRequest: ItemRequest = {
      numeroItem, descripcion, ubicacion, cantidadDiponible, puntoReorden,
      costoUnitario, tasaUso,
      idCategoria, action
    };
    this.inventarioService.save(inventarioRequest)
      .subscribe(
        ({ msg }) => {
          $('#modal-add-inventario').modal('hide');
          Swal.fire({
            icon: 'success', title: 'Satisfactorio', text: msg
          });
          this.inventarioSubscription$  = this.inventarioService.findAll();
        },
        (err) => Swal.fire({
          icon: 'error', title: 'Error al agregar Item', text: err.msg
        })
      );
  }

  public deleteCurrentInventario(): void{
    this.inventarioService.deleteById(this.currentInventario.numero_item)
    .subscribe(
      ({ msg }) => {
        $('#modal-delete-inventario').modal('hide');
        Swal.fire({
          icon: 'success', title: 'Satisfactorio', text: msg
        });
        this.inventarioSubscription$  = this.inventarioService.findAll();
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

  public searchInventario({ target: { value } }): void{
    this.inventarioSubscription$ = this.inventarioService.findByNameOrSurname(value);
  }

}
