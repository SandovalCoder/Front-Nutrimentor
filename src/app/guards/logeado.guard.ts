import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard {


  constructor (private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
              MaybeAsync<GuardResult> 

  {
    return this.userService.hayUsuarioLogeado();
    
  }

}
