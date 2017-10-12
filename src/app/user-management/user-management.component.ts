import { Component, OnInit } from '@angular/core';

import { UserManagementService } from './user-management.service';

import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {default as swal} from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  public model: any = {};
  public modo: string;
  public token: string;
  public mensajeServer: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.modo = this.route.snapshot.params['modo'];
    this.token = this.route.snapshot.params['token'];
    if(this.modo === 'verify'){
      this.verify(this.token);

    }else if(this.modo === 'reset'){
      //this.cambiarPass(this.token);
    }else{
      this.router.navigate(['/']);
    }
  }

  public verify(token){
    this.userManagementService.verify(this.token).then(
        resultado => {
          // console.log('Llego:');
          // console.log(resultado);
          this.mensajeServer = "Su cuenta ha sido validada correctamente.";
          /*swal(
            'Error al intentar ingresar',
            'TODO OK',
            'success'
          ).catch(swal.noop);
          */
          if(resultado){
            this.router.navigate(['/ingreso']);
          }

        }
      ).catch(err => {
        // console.log('Ocurrio un error al intentar loguearse');
        // alert('Usuario y/o password incorrectos!');
        this.mensajeServer = "Ocurrio un problema al validar su cuenta."
        /*
        swal(
          'Error al intentar ingresar',
          'Usuario y/o contraseña incorrecto/s',
          'error'
        ).catch(swal.noop);
        */
        console.log(err)});
  }

  public cambiarPass(){
    console.log(this.model.password);
    console.log(this.model.passwordRepetido);
    if(this.model.password != this.model.passwordRepetido){
      swal(
          'Error en la Contraseña',
          'Las Contraseñas no coinciden',
          'error'
        ).catch(swal.noop);
    }else if(this.model.password.length < 6){
      swal(
          'Error en la Contraseña',
          'La Contraseñas tiene que tener al menos 6 caracteres',
          'error'
        ).catch(swal.noop);
    }else{
      console.log('GG');


    this.userManagementService.cambiarPass(this.token,this.model.password).then(
        resultado => {
          swal(
          'Correcto',
          'Contraseña cambiada correctamente',
          'success'
        ).catch(swal.noop);


        this.router.navigate(['/ingreso']);


        }
      ).catch(err => {
        // console.log('Ocurrio un error al intentar loguearse');
        // alert('Usuario y/o password incorrectos!');
        this.mensajeServer = "Ocurrio un problema al validar su cuenta."
        if(err.type == 2){
          swal(
            'Error al cambiar la contraseña',
            'El tiempo para cambiar la contraseña ha caducado, realize el procedimiento nuevamente.',
            'error'
          ).catch(swal.noop);
        }else{
          swal(
            'Error al cambiar las contraseñas',
            err.message,
            'error'
          ).catch(swal.noop);
        }


        console.log(err.type);
      });

    }
  }


  public login(){
    ///:modo/:token',
    console.log(this.route.snapshot.params['modo']);
    console.log(this.route.snapshot.params['token']);

    /*
    if(this.model != {}){
      this.loginService.login(this.model.email, this.model.password).then(
        resultado => {
          console.log('Llego:');
          console.log(resultado);

          if(resultado){
            this.router.navigate(['/turnos']);
          }

        }
      ).catch(err => {
        // console.log('Ocurrio un error al intentar loguearse');
        // alert('Usuario y/o password incorrectos!');
        swal(
          'Error al intentar ingresar',
          'Usuario y/o contraseña incorrecto/s',
          'error'
        ).catch(swal.noop);
        console.log(err)});
    }
    */
  }

}
