import { Component, OnInit } from '@angular/core';


import { RegistroService } from './registro.service';

declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public model: any = {};
  public obraSelected: any;


  constructor(
    private registroService: RegistroService
  ) { }

  ngOnInit() {
    console.log('Entre al ngOnInit de registro');

  }

  public registrar(){
    console.log(this.model);
    console.log(this.obraSelected);

    this.registroService.registrarUsuario(this.model.nombre, this.model.apellido, this.model.dni, this.model.email, this.model.password, new Date(), this.model.tel, this.obraSelected._id);
  }


}
