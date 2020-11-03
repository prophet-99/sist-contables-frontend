import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
    if (this.authService.existUserLogin()) this.router.navigateByUrl('/dashboard');
  }

  public login(): void{
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password)
      .subscribe(
        (elm) => this.router.navigateByUrl('/dashboard'),
        (err) => Swal.fire({
          icon: 'error',
          title: 'Error en la autenticación',
          text: 'Usuario o contraseña incorrectos'
        })
      );
  }

}
