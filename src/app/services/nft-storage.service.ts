import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NftStorageService {

    constructor(
        protected http: HttpClient,
    ) {}

    getFromStorage(url: string, id: number ){
        return this.http.get(url + '/' + id + '.json')
    }

}
