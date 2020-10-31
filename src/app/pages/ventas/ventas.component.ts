import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor() {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('.c-form__input');

    const expresiones = {
        dni: /^\d{8}$/,
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        telefono: /^\d{6,9}$/, 
        ubicacion: /^[a-zA-Z0-9\s\#\-]{4,20}$/
    };
    const campos = {
        dni: false,
        nombre: false,
        apellido: false,
        telefono: false,
        ubicacion: false
    };
    const validarFormulario = (e) => {
        console.log(e.target.name);
        switch (e.target.name) {
            case "dni":
                validarCampo(expresiones.dni, e.target, 'dni');
                break;
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "apellido":
                validarCampo(expresiones.apellido, e.target, 'apellido');
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            case "ubicacion":
                validarCampo(expresiones.ubicacion, e.target, 'ubicacion');
                break;
        }
    };
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) { 
            document.getElementById(`user_${campo}`).classList.remove('form_grupo-incorrecto'); //obtener el id del grupo usuario
            document.getElementById(`user_${campo}`).classList.add('form_grupo-correcto');
            document.querySelector(`#user_${campo} i`).classList.add('fa-check-circle'); //acceder al icono del grupo 
            document.querySelector(`#user_${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#user_${campo} .input_error`).classList.remove('input_error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`user_${campo}`).classList.add('form_grupo-incorrecto');
            document.getElementById(`user_${campo}`).classList.remove('form_grupo-correcto');
            document.querySelector(`#user_${campo} i`).classList.add('fa-times-circle'); 
            document.querySelector(`#user_${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#user_${campo} .input_error`).classList.add('input_error-activo');
            campos[campo] = false;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

   }

  ngOnInit(): void {
  }

  
}
