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
export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginURL = 'http://localhost:3030/authentication';  // URL to web api
  private authURL = 'http://localhost:3030/authManagement';  // URL to web api

  private strategy: string = "local"; // Esto podria estar en un archivo de configuracion

  constructor(private http: Http, private router: Router,
    private usuariosService: UsuariosService
  ) { }

  // public login(email, password):Promise<Usuario>{
  public login(email, password){

    //--------------------------------------------------------------------------

    // IMPORTANE

    /*
    OBS: los datos estan viajando en plano. (inclusive la contrasena)
    */

    //--------------------------------------------------------------------------

    let yo = this;
    return this.http
    .post(this.loginURL, JSON.stringify(
      {
        email: email,
        password: password,
        strategy: this.strategy
      }
    ), {headers: this.headers})
    .toPromise()
    .then(res => {
      let token = res.json().accessToken;
      let userEmail = email;
      let user :any = {};
      if (userEmail && token) { // se podria usar el username u otro atributo

        return this.usuariosService.getUsuarioConToken(userEmail,token).then(usuarioIngresado => {
          let aux: any = usuarioIngresado;

          //Guardamos el token y los datos en el local storage
          user.email = userEmail;
          user.token = token;
          user.nombre = aux.nombre;
          user.apellido = aux.apellido;
          user.dni = aux.dni;
          user.obra = aux.obra;
          user.clase = aux.clase;
          user.aprobado = aux.aprobado;
          user.eliminado = aux.eliminado;
          user.sancion = aux.sancion;
          user.particular = aux.particular;
          user._idPaciente = aux._idPaciente;


          //********************************************************************
          user._id = aux._id; //Ver si hacer esto o hacer otro llamdo para obtener todos los datos
          //********************************************************************
          let salida = res.json();
          // console.log("La salida quedo 1:");
          // console.log(salida);
          if(user.clase == 'paciente'){
            localStorage.setItem('currentPaciente', JSON.stringify(user));
            // console.log(user);
            if(user.aprobado == false){
              salida.accessToken = null;
              localStorage.removeItem('currentPaciente');
              // console.log("La salida quedo 2:");
              // console.log(salida);
              throw new Error("Su cuenta aun no fue aprobada por un administrativo de la clinica");
            }

            if(user.eliminado == true){
              salida.accessToken = null;
              localStorage.removeItem('currentPaciente');
              // console.log("La salida quedo 2:");
              // console.log(salida);
              throw new Error("Existe un problema con su cuenta, comuniquese con la clinica para mas informacion");
            }

            if(user.sancion == true){
              salida.accessToken = null;
              localStorage.removeItem('currentPaciente');
              // console.log("La salida quedo 2:");
              // console.log(salida);
              throw new Error("Existe un problema con su cuenta, comuniquese con la clinica para mas informacion");
            }
          }else{

            // No puede loguearse siendo un administrativo o un medico!
            salida.accessToken = null;
            // console.log("La salida quedo 3:");
            // console.log(salida);
            throw new Error("Solo se puede ingresar con cuentas de pacientes habilitadas");
          }


          // console.log("La salida quedo 4:");
          // console.log(salida);
          return salida;
        }).catch(err => {
          // console.log("Pase por aca");
          throw err;
        })
      }



    })
    .catch(err => {
      // console.log('Error en login service');
      // console.log(err)
      if(err.status === 401){
        throw new Error("Error en los datos ingresados. Compruebe su usuario y contraseña");
      }
      else{
        throw err;
      }
    })


  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentPaciente');
    this.router.navigate(['/']);
  }





    // public login(email, password):Promise<Usuario>{
  public recuperarPass(email){
    return this.http
    .post(this.authURL, JSON.stringify(
      {
        action: 'sendResetPwd',
        value: { email }
      }
    ), {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log('Token recibido');
      let token = res.json().accessToken;
    })
    .catch(err => {
      console.log('Error en login service');
      console.log(err)
      throw err;
    })


  }








  //---------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    console.error('Ocurrio un error en servicio de Login: ', error);
    // alert(error.json().error);
    return Promise.reject(error.message || error);
  }

}
