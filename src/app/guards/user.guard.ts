import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UserGuard {


  constructor (private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
              MaybeAsync<GuardResult> 

  {
      let permisos = this.userService.getAuthoritiesActual();
      if (permisos) {
        if (permisos.indexOf("USER")>=0) {
          return true;
        }
      }
      return false;
  }

}
