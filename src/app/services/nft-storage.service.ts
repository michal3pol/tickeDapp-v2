import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NFTStorage } from "nft.storage";
import { EventData } from 'src/types/event.model';
import { NftEventMetadata, NftTicketMetadata } from 'src/types/nft.model';
import NftMetadataUtil from '../utils/NftMetadataUtil';
import { Observable } from 'rxjs';

const HTTP_PREFIX = "https://";
const IPFS_SUFIX = ".ipfs.nftstorage.link/";

@Injectable({
  providedIn: 'root'
})
export class NftStorageService {

  constructor(
    protected http: HttpClient,
    protected nftMetadataUtil: NftMetadataUtil
  ) { }

  async storeAtIpfs(eventData: EventData, apiKey: string): Promise<string> {

    const client = new NFTStorage({ token: apiKey });

    const nftEventMetadata: NftEventMetadata = {
      name: eventData.name,
      description: eventData.description,
      date: eventData.date,
      image: eventData.image
    } 


    let files: File[] = [];
    
    for(let i=0, id=1; i < eventData.sectors.length; i++) {
      let sector = eventData.sectors[i];
      sector.tokenIds = [];
      
      if(sector.numerableSeats && sector.seatsFrom != undefined) {
        const noSeats = sector.seatsTo - sector.seatsFrom + 1;
        for(let j=0; j < noSeats; j++) {
          files.push(
            this.nftMetadataUtil.createTicketMetadataJson(
              nftEventMetadata, sector, id, sector.seatsFrom + j)
          )
          sector.tokenIds.push(id);
          id++;
        }
      } else {
        // non numerable tickets
        files.push(this.nftMetadataUtil.createTicketMetadataJson(
          nftEventMetadata,sector, id));
          sector.tokenIds.push(id);
          id++;
      }
      eventData.sectors[i] = sector;
    }

    files.push(new File([JSON.stringify(eventData, null, 2)], '0.json'))

    const cid = await client.storeDirectory(files);
    return HTTP_PREFIX + cid + IPFS_SUFIX
  }

  getNftDataFromStorage(url: string, id: number): Observable<NftTicketMetadata>{
    return this.http.get<NftTicketMetadata>(url + '/' + id + '.json')
  }

  getStorageConcertInfo(url: string): Observable<EventData>{
    return this.http.get<EventData>(url + '/0.json')
  }
}
