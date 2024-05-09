import { Injectable } from '@angular/core';
import { BigNumber, ethers } from "ethers";
import Event from '../../../../artifacts/contracts//Event.sol/Event.json'
import { WalletService } from '../wallet.service';
import { BlockchainSelectorService } from '../blockchain-selector.service';
import { BlockchainSelector } from 'src/types/blockchain-selector.model';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private walletService: WalletService,
    private blockchainSelectorService: BlockchainSelectorService,
    private snackbarService: SnackbarService
  ) { }

  /**
   * Function interacts with smartcontract and fires transaction to buy ticket
   *
   * @param address - Address of concert contract 
   * @param tokenId - ID of token to buy 
   * @param price - ID of token to buy 
   * @param amount - amount of tokens to buy (by default = 1)
   * 
   */
  public async buyTicket(address: string, tokenId: number, price: BigNumber, amount = 1) {
    const contract = await this.getContract(address, true)
    const transaction = await contract['buyTicket'](tokenId, amount, {
      value: ethers.utils.parseUnits((price.mul(amount)).toString(), "wei")
    })
    const tx = await transaction.wait();

    return tx.status === 1
  }

  /**
   * Withdraws money for currently logged wallet
   * 
   */
  public async withdrawOrgCredits(address: string){
    const contract = await this.getContract(address, true)
    try {
      return await contract['withdrawOrgCredits'](this.walletService.getWalletAddress())
    } catch(e: any) {
      console.log(e.error.message )
    }
  }

  /**
   * Function interacts with smartcontract and fires transaction to check approval of tokens
   *
   * @param address - Address of concert contract 
   * @param account - Owner of tokens
   * @param operator - Address to check 
   * @returns State of approval
   * 
   */
  public async isApprovedForAll(address: string, account: string, operator: string): Promise<boolean>{
    const contract = await this.getContract(address)
    return contract['isApprovedForAll'](account, operator)
  }

  public async getUri(address: string, tokenId: number) {
    const contract = await this.getContract(address)
    return contract['uri'](tokenId)
  }

  public async getOrgAddress(address: string): Promise<string> {
    const contract = await this.getContract(address)
    return contract['orgAddress']()
  }

  public async getIpfsLink(address: string): Promise<string> {
    const contract = await this.getContract(address)
    return contract['ipfsLink']()
  }
  
  public async getSoldTokenIds(address: string): Promise<number[]> {
    const contract = await this.getContract(address)
    return contract['getSoldTokenIds']()
  }

  public async setApprovalForAll(address: string, operator: string, approved: boolean) {
    const contract = await this.getContract(address, true)
    contract['setApprovalForAll'](operator, approved)
  }  

  private async getContract(address: string, bySigner= false) {
    const provider = new ethers.providers.Web3Provider(<any>window.ethereum)
    const signer = provider.getSigner()

    let currentBlockchain: BlockchainSelector;
    this.blockchainSelectorService.selectedBlockchain$.subscribe(
      blockchain => currentBlockchain = blockchain
    )
    
    if(currentBlockchain!.chainId != (await provider.getNetwork()).chainId) {
      this.snackbarService.errorPulsing("Sync your wallet blockchain with site blockchain!")
    }

    return new ethers.Contract(
      address,
      Event.abi,
      bySigner ? signer : provider
    )
  }
}
