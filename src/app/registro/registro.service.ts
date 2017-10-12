import { Injectable } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { UsuariosService } from '../usuarios/usuarios.service';
import {default as swal} from 'sweetalert2';


@Injectable()
export class RegistroService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService
  ) { }

  /*
    Esta clase no hace falta. Podria hacerse directo con usuariosService
  */
  public registrarUsuario(nombrePaciente,apellidoPaciente, dniPaciente, emailPaciente, password, nacimientoPaciente, telefonoPaciente, obraPaciente){

    nombrePaciente = this.capitalizeFirstLetter(nombrePaciente.toLowerCase());
    apellidoPaciente = this.capitalizeFirstLetter(apellidoPaciente.toLowerCase());

    this.usuariosService.createPaciente(nombrePaciente,apellidoPaciente, dniPaciente, emailPaciente, password, nacimientoPaciente, telefonoPaciente, obraPaciente)
    .then(nuevoUsuario => {
      console.log('Este es el nuevo usuario');
      console.log(nuevoUsuario);

      swal(
        'Usuario registrado con éxito!',
        'Bienvenido a nuestro sistema',
        'success'
      ).catch(swal.noop);


      this.router.navigate(['/ingreso']);

    }).catch(err => {
      //Si ocurre un error a la hora de registrase.

      swal(
        'Error al intentar registrarse',
        'Intente de nuevo mas tarde por favor, o comuníquese con nuestra clinica via telefonica',
        'error'
      ).catch(swal.noop);
    });
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
