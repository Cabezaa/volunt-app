import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DonacionesListaComponent } from './donaciones-lista/donaciones-lista.component';
//import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
//import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './login/auth.guard';

const appRoutes: Routes =  [
{
	path:'',
	component: MainComponent
},
{
	path:'registro',
	component: RegistroComponent
}
,
{
	path:'ingreso',
	component: LoginComponent
},
{
	path:'login/:modo/:token',
	component: UserManagementComponent
},
{
	path:'donaciones',
	component: DonacionesListaComponent
}



/*,
{
	path:'cancelarTurno',
	component: CancelarTurnoComponent,
	canActivate: [AuthGuard]
},
{
	path:'turnos',
	component: SolicitarTurnoComponent,
	canActivate: [AuthGuard]
}
*/
];


export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
