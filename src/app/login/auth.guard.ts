import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

//TRUCO PARA QUE NO LIME
import { AppComponent } from '../app.component';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    /* Try to auth with the server. If authed resolve to true, else resolve to false */
    let currentPaciente = JSON.parse(localStorage.getItem('currentPaciente'));
    if(currentPaciente){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
