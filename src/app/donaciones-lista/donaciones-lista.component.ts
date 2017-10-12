import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../usuarios/usuarios.service';
//import { DoctoresService } from '../doctores/doctores.service';
//import { TurnosService } from '../turnos/turnos.service';

@Component({
  selector: 'donaciones-lista',
  templateUrl: './donaciones-lista.component.html',
  styleUrls: ['./donaciones-lista.component.css']
})
export class DonacionesListaComponent implements OnInit {

  public currentPaciente: any = {};
  public doctores: any[] = [];
  public doctorSelected: any = {};
  public turnosDoctor: any[] = [];
  private turnosTotales: any[] = [];
  private turnos: any[] = [];
  public filtros: any[] = [];
  public filtroSeleccionado = '';
  private turnosTemp = [];
  private turnosFiltrados= [];
  public seccionDisponibles = []; //Hace referencia a "mañana" - "tarde"
  public seccionSeleccionada = '';

  public obrasSociales : any[] = [];
  public obraSeleccionada : any;


  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {

   


  }




}
