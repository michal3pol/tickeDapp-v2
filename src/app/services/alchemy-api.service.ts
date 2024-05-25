import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnedNFTs } from 'src/types/nft.model';

@Injectable({
  providedIn: 'root'
})
export class AlchemyApiService {

  constructor(
    private http: HttpClient
  ) { }

  getUserNfts(url: string, walletAddr: string): Observable<OwnedNFTs> {
    const finalUrl = url + "/getNFTs/?owner=" + walletAddr
    return this.http.get<OwnedNFTs>(finalUrl)
  }


}
