import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';


import {MomentModule} from 'angular2-moment';
import 'moment/locale/es';

//Servicios
import { RegistroService } from './registro/registro.service';
//import { ObrasService } from './obras/obras.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { LoginService } from './login/login.service';
import { UserManagementService } from './user-management/user-management.service';

//Componentes
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DonacionesListaComponent } from './donaciones-lista/donaciones-lista.component';

import { UsuariosComponent } from './usuarios/usuarios.component';

import { TopnavbarComponent } from './ui/topnavbar/topnavbar.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




//Guardamos
import { AuthGuard } from './login/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistroComponent,
    LoginComponent,
    UserManagementComponent,
    DonacionesListaComponent,
    UsuariosComponent,

    TopnavbarComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MomentModule,
    BrowserAnimationsModule
  ],
  providers: [
    RegistroService,

    UsuariosService,
    LoginService,
    UserManagementService,

    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
