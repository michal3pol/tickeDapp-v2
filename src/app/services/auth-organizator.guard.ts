import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EventFactoryService } from 'src/app/services/smartcontracts/event-factory.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOrganizatorGuard implements CanActivate {
  
  constructor(
    private tickedFactoryService: EventFactoryService,
    private walletService: WalletService,
  ) {}
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      return this.tickedFactoryService.authorizeAccess(
         await this.walletService.getWalletAddress()
      );
  }
  
}
