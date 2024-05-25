import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BlockchainSelectorService } from 'src/app/services/blockchain-selector.service';
import { blockchains } from 'src/environments/blockchain-config';
import { BlockchainSelector } from 'src/types/blockchain-selector.model';


@Component({
  selector: 'app-blockchain-selector',
  templateUrl: './blockchain-selector.component.html',
  styleUrls: ['./blockchain-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockchainSelectorComponent {

  blockchainOptions: BlockchainSelector[] = blockchains;  
  blockchainSelect = this.blockchainOptions[0];

  constructor(
    protected blockchainSelectorService: BlockchainSelectorService
  ) {
  }

  changeBlockchain(event: MatSelectChange) {
    this.blockchainSelectorService.changeBlockchain(event.value)
  }
}
