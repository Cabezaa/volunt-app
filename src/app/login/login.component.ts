import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';

import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {default as swal} from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public login(){
    let yo = this;
    if(this.model != {}){
      if(this.model.email){
        this.model.email = this.model.email.toLowerCase();
      }
      this.loginService.login(this.model.email, this.model.password).then(
        resultado => {
          if(resultado){
            yo.router.navigate(['/turnos']);
          }

        }
      ).catch(err => {
        // console.log('Ocurrio un error al intentar loguearse');
        // alert('Usuario y/o password incorrectos!');
        // console.log("AGARRE UN ERRORRRRRRRRRRRRRRRRRRRRR");
        // console.log(err);
        var mensaje = err.toString()
        swal(
          'Error al intentar ingresar',
          mensaje,
          'error'
        ).then(
          function(){
            // yo.router.navigate(['/']);
          },
          function(dismiss){
            // yo.router.navigate(['/']);
          }
        ).catch(swal.noop);
        // console.log(err)


      });
    }
  }


  public validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  public recuperarPass(){

    if(this.model != {}){
      console.log(this.model.email);
      console.log(this.validateEmail(this.model.email));
      if(!this.validateEmail(this.model.email)){
        swal(
          'Error en el email',
          'Debe completar el campo email con su respectiva direccion de correo electronico para poder enviarle instrucciones.',
          'error'
        ).catch(swal.noop);
      }else{

      this.loginService.recuperarPass(this.model.email).then(
        resultado => {
          // console.log('Llego:');
          // console.log(resultado);

          swal(
            'Recuperación iniciada',
            'Se envió un email con instrucciones para la recuperación.',
            'info'
          ).catch(swal.noop);

          if(resultado){
            this.router.navigate(['/']);
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

    }
  }

}
