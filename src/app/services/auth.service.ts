import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAuth } from '../models/user-auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseAPI = `${ environment.API }/login`;
  public currentUser: UserAuth = null;

  constructor(private httpClient: HttpClient) { }

  public login(usernameReq: string, passwordReq: string): Observable<{ ok: boolean, user: UserAuth }>{
    return this.httpClient
      .post<{ ok: boolean, user: UserAuth }>(this.baseAPI, { username: usernameReq, password: passwordReq })
      .pipe(
        tap( ({ user: { id_empleado, id_rol, username, nombres, apellidos, rol } }) =>
          this.currentUser = new UserAuth(
            id_empleado, username, nombres, apellidos, id_rol, rol
        ) ),
        tap( (_) => localStorage.setItem('SYS-ACCOUNT-AUTH', JSON.stringify(this.currentUser)) )
      );
  }

  public initAuthListener(): void{
    const user = JSON.parse(localStorage.getItem('SYS-ACCOUNT-AUTH'));
    if (user){
      this.currentUser = new UserAuth(
        user.idEmpleado, user.username, user.nombres, user.apellidos, user.idRol, user.rol
      );
    }
  }

  public logout(): void{
    localStorage.removeItem('SYS-ACCOUNT-AUTH');
  }

  public existUserLogin(): boolean{
    const user = JSON.parse(localStorage.getItem('SYS-ACCOUNT-AUTH'));
    return (user) ? true : false;
  }
}
