import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/toPromise';

import { Usuario } from './usuario.tipo';


@Injectable()
export class UsuariosService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersURL = 'http://localhost:3030/users';  // URL to web api
  private pacientesURL = 'http://localhost:3030/pacientes';  // URL to web api


  constructor(private http: Http) { }


  public getUsuario(email){
    return this.http.get(this.usersURL+'/'+'?email='+email, this.jwt())
    .toPromise()
    .then(res => {
      return res.json() as Promise<Usuario>
    })
    .catch(err => console.log(err))
  }

  /*
    Metodo temporal
  */
  public getUsuarioConToken(email,token){


    let headers2 = new Headers({ 'Authorization': token });
    let headerConJWT = new RequestOptions({ headers: headers2 });

    return this.http.get(this.usersURL+'/'+'?email='+email, headerConJWT)
    .toPromise()
    .then(res => {
      // console.log("me llego lo sigueinte");
      // console.log(res.json()[0]);
      return res.json()[0] as Promise<Usuario>
    })
    .catch(err => console.log(err))
  }
  public getPaciente(email){
    return this.http.get(this.pacientesURL+'/'+'?email='+email, this.jwt())
    .toPromise()
    .then(res => {
      return res.json() as Promise<Usuario>
    })
    .catch(err => console.log(err))
  }

  public createUsuario(nombrePaciente,apellidoPaciente, dniPaciente, emailPaciente, password, nacimientoPaciente, telefonoPaciente, obraPaciente):Promise<Usuario>{

    //--------------------------------------------------------------------------

    // IMPORTANE

    /*
    OBS: los datos estan viajando en plano. (inclusive la contrasena)
    */

    //--------------------------------------------------------------------------

    //El paciente=true es para que ademas se cree un paciente

    emailPaciente = emailPaciente.toLowerCase();
    return this.http
    .post(this.usersURL, JSON.stringify({nombre: nombrePaciente ,apellido: apellidoPaciente,
      dni: dniPaciente, email: emailPaciente, password:password, nacimiento: nacimientoPaciente,
      telefono: telefonoPaciente, obra: obraPaciente, paciente:true,
      eliminado: false,sancion: false
    }), {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log('CREATE USUARIO');
      console.log(res.json());
      return res.json() as Promise<Usuario>;
    })
  }

  createPaciente(nombrePaciente,apellidoPaciente, dniPaciente, emailPaciente, password, nacimientoPaciente, telefonoPaciente, obraPaciente){

    emailPaciente = emailPaciente.toLowerCase();
		return this.http
		.post(this.pacientesURL, JSON.stringify({nombre: nombrePaciente ,apellido: apellidoPaciente,
			 dni: dniPaciente, email: emailPaciente, password:password, nacimiento: nacimientoPaciente,
			 telefono: telefonoPaciente, obra: obraPaciente, ocupacion: "", observaciones:"",
			 eliminado: false, sancion: false
		 }),{headers: this.headers})
		 .toPromise()
		.then(res => {
			return res.json();
		})
	}


  public getCurrentPaciente(){

    let currentPaciente = JSON.parse(localStorage.getItem('currentPaciente'));
    return currentPaciente;
    // if(currentPaciente){
    //   return this.http.get(this.pacientesURL+"?_idUsuario="+currentPaciente._id,this.jwt()).toPromise().then(respuesta =>{
    //     // console.log("la respuesta es que llego es la de $$$$.");
    //     // // console.log(respuesta.json());
    //     // console.log(respuesta.json()[0]);
    //     var resp = respuesta.json()[0];
    //     currentPaciente._idPaciente = respuesta.json()[0]._id;
    //     resp.token = currentPaciente.token;
    //
    //     return resp;
    //     // return currentPaciente;
    //   }).catch(err => {
    //     console.log("Error a la hora de obtener el currentPaciente.");
    //     console.log(err);
    //     throw err;
    //   });
    // }

  }

  //----------------------------------------------------------------------------

  /*
    Si quisieramos usar la estrategia de jwt con el esquema Bearer, debemos modificar las opciones de jwt del server.
    Ver las opciones de JWT en https://docs.feathersjs.com/api/authentication/jwt.html
  */
  public jwtBearer(): RequestOptions {

    let currentUsuario = JSON.parse(localStorage.getItem('currentPaciente'));
    if (currentUsuario && currentUsuario.token) {
      let headers2 = new Headers({ 'Authorization': 'Bearer ' + currentUsuario.token });
      return new RequestOptions({ headers: headers2 });
    }
  }

  public jwt(): RequestOptions {

    let currentUsuario = JSON.parse(localStorage.getItem('currentPaciente'));

    if (currentUsuario && currentUsuario.token) {
      let headers2 = new Headers({ 'Authorization': currentUsuario.token });
      return new RequestOptions({ headers: headers2 });
    }
  }

  public jwtContentType(){
    let jwt = this.jwt();
    jwt.headers.append('Content-Type', 'application/json');
    return jwt;
  }




  //---------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    console.error('Ocurrio un error en servicio de Pacientes: ', error);
    // alert(error.json().error);
    return Promise.reject(error.message || error);
  }

}
