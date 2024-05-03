import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from 'src/environments/environment';
import EventFactory from '../../../../artifacts/contracts/EventFactory.sol/EventFactory.json'
import { EventInfo, EventType, RateScore } from 'src/types/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventFactoryService {

  constructor() { }

  /**
   * Function interacts with smartcontract and fires transaction to create new event contract
   *
   * @param name - Name of concert
   * @param desc - Description of concert 
   * @param date - Date of concert
   * @param image - Image of audience layout
   * @param sectors - Structure of sectors 
   * @returns Status of transaction
   */
  public async createEventContract( eventType: EventType, ipfsLink: string, sectorsName: string[], sectorsNoPlace: number[], 
    sectorsNumerable: boolean[], sectorsPrice: string[] ) {
    
    const contract = await EventFactoryService.getContract(true)
    const transaction = await contract['createEvent'](
      eventType, ipfsLink, sectorsName, sectorsNoPlace, sectorsNumerable, sectorsPrice)
    const tx = await transaction.wait()

    return tx.status === 1
  }

  /**
   * Function interacts with smartcontract and fires transaction to validate owner of factory
   *
   * @param address - Address of wallet 
   * 
   */
  public async validateOwner(address: string): Promise<boolean> {
    const contract = await EventFactoryService.getContract()
    return address === await contract['ownerAddr']()
  }

  public async rateOrganizer(orgAddress: string, vote: boolean) {
    const contract = await EventFactoryService.getContract()
    contract['rateOrganizer'](orgAddress, vote)
  }

  /**
   * Function interacts with smartcontract and fires transaction to set organizator permissions
   *
   * @param address - Address of wallet (organizer) 
   * @param toggle - Toggle for specifying permissions (true/false)
   * 
   */
  public async updateOrgFee(newOrgFee: number) {
    const contract = await EventFactoryService.getContract(true)
    contract['updateOrgFee'](newOrgFee)
  }

  public async withdrawOrgCredits() {
    const contract = await EventFactoryService.getContract(true)
    contract['withdrawOrgCredits']()
  }

  public async getEventsByType(eventType: number): Promise<EventInfo []> {
    const contract = await EventFactoryService.getContract()
    return contract['getEventsByType'](eventType)
  }

  public async getOrganizerScore(address: string): Promise<RateScore> {
    const contract = await EventFactoryService.getContract()
    return contract['getOrganizerScore'](address)
  }

  private static async getContract(bySigner= false) {
    const provider = new ethers.providers.Web3Provider(<any>window.ethereum)
    const signer = provider.getSigner()

    return new ethers.Contract(
      environment.contractEventFactoryAddress,
      EventFactory.abi,
      bySigner ? signer : provider
    )
  }

}
