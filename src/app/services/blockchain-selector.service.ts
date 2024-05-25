import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { blockchains } from 'src/environments/blockchain-config';
import { BlockchainSelector } from 'src/types/blockchain-selector.model';

@Injectable({
  providedIn: 'root'
})
export class BlockchainSelectorService {

  private selectedBlockchainSubject = new BehaviorSubject<BlockchainSelector>(blockchains[0]);

  selectedBlockchain$ = this.selectedBlockchainSubject.asObservable();

  constructor() { }

  changeBlockchain(newBlockchain: BlockchainSelector) {
    this.selectedBlockchainSubject.next(newBlockchain);
  }
}
