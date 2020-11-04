import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAuth } from '../models/user-auth.model';
import { MenuAuth, StaticFrontendMenuRef } from '../models/menu-auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseAPI = `${ environment.API }/login`;
  public currentUser: UserAuth = null;
  public currentMenu: MenuAuth = null;

  constructor(private httpClient: HttpClient) { }

  public login(usernameReq: string, passwordReq: string): Observable<{ ok: boolean, user: UserAuth }>{
    return this.httpClient
      .post<{ ok: boolean, user: UserAuth, staticFrontendMenuRef: MenuAuth }>
      (this.baseAPI, { username: usernameReq, password: passwordReq })
      .pipe(
        tap( ({ user: { id_empleado, id_rol, username, nombres, apellidos, rol } }) =>
          this.currentUser = new UserAuth(
            id_empleado, username, nombres, apellidos, id_rol, rol
        ) ),
        tap( ({ staticFrontendMenuRef }) => this.currentMenu = staticFrontendMenuRef),
        tap( (_) => localStorage.setItem('SYS-ACCOUNT-AUTH', JSON.stringify(this.currentUser)) ),
        tap( (_) => localStorage.setItem('SYS-ACCOUNT-MENU', JSON.stringify(this.currentMenu)) )
      );
  }

  public initAuthListener(): void{
    const user = JSON.parse(localStorage.getItem('SYS-ACCOUNT-AUTH'));
    if (user){
      this.currentUser = new UserAuth(
        user.idEmpleado, user.username, user.nombres, user.apellidos, user.idRol, user.rol
      );
      this.currentMenu = JSON.parse(localStorage.getItem('SYS-ACCOUNT-MENU'));
    }
  }

  public logout(): void{
    localStorage.removeItem('SYS-ACCOUNT-AUTH');
    localStorage.removeItem('SYS-ACCOUNT-MENU');
  }

  public existUserLogin(): boolean{
    const user = JSON.parse(localStorage.getItem('SYS-ACCOUNT-AUTH'));
    return (user) ? true : false;
  }
}
