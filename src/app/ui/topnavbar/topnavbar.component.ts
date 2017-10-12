import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../login/login.service';
@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }

  public estaLogueado(){

    var usuario: any = JSON.parse(localStorage.getItem('currentPaciente'));
    // console.log(localStorage);
    if(usuario!=undefined && usuario != null){
      // console.log("usuario logueado")
      return true;
    }
    return false;
  }
}
