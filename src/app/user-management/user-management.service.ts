import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/toPromise';

import { Usuario } from '../usuarios/usuario.tipo';
import { UsuariosService } from '../usuarios/usuarios.service';


@Injectable()
export class UserManagementService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private authURL = 'http://localhost:3030/authManagement';  // URL to web api

  private strategy: string = "local"; // Esto podria estar en un archivo de configuracion

  constructor(private http: Http, private router: Router,
    private usuariosService: UsuariosService
  ) { }

  // public login(email, password):Promise<Usuario>{
  public verify(token){
    return this.http
    .post(this.authURL, JSON.stringify(
      {
        action: 'verifySignupLong',
        value: token
      }
    ), {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log('Token recibido');
      let token = res.json();
      console.log(token);
    })
    .catch(err => {
      console.log('Error en login service');
      console.log(err)
      throw err;
    })
  }

  public cambiarPass(token,password){
    return this.http
    .post(this.authURL, JSON.stringify(
      {
        action: 'resetPwdLong',
        value: { token: token, password: password }
      }
    ), {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log('Token recibido');
      let token = res.json();
      console.log(token);
    })
    .catch(err => {
      console.log('Error en login service');
      console.log(err)
      throw err;
    })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentPaciente');
    this.router.navigate(['/']);
  }



  //---------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    console.error('Ocurrio un error en servicio de Login: ', error);
    // alert(error.json().error);
    return Promise.reject(error.message || error);
  }

}
