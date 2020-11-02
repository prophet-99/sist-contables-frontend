import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseAPI = `${ environment.API }/empleado`;

  constructor(private httpClient: HttpClient) { }

  // http://localhost:3000/api/v1/empleado
  public findAll(): any{
    return this.httpClient.get<any>(`${ this.baseAPI }`)
      .pipe(
        map(({ empleados }) => empleados)
      );
  }

  // http://localhost:3000/api/v1/empleado?search=''
  public findByNameOrSurname(paramSearch: string): any{
    return this.httpClient.get(`${ this.baseAPI }?search=${ paramSearch }`);
  }

  // http://localhost:3000/api/v1/empleado/inactives
  public findAllInactives(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

  // http://localhost:3000/api/v1/empleado/inactives?search=''
  public findByNameOrSurnameInactives(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

  // http://localhost:3000/api/v1/empleado
  public save(): any{
    // return this.httpClient.post(`${ this.baseAPI }`);
  }

  // http://localhost:3000/api/v1/empleado/:idEmpleado
  public deleteById(): any{
    return this.httpClient.get(`${ this.baseAPI }`);
  }

}
