import { Injectable } from "@angular/core";
import { SectorData } from "src/types/event.model";
import { NftEventMetadata, NftTicketMetadata } from "src/types/nft.model";

@Injectable({
    providedIn: 'root'
})
export default class NftMetadataUtil {

    createSectorTicketMetadataJson(eventData: NftEventMetadata, sectorData: SectorData, id: number) {
        const nftTicketMetada: NftTicketMetadata = {
            sector: sectorData.name,
            tokenId: id,
            price: sectorData.price,
            numerable: false
        } 

        const nft = {
            event: eventData,
            ticket: nftTicketMetada
        }
        return new File([JSON.stringify(nft, null, 2)], id +'.json');
    }

    createTicketMetadataJson(eventData: NftEventMetadata, sectorData: SectorData, id: number, seatNo: number) {
        const nftTicketMetada: NftTicketMetadata = {
            sector: sectorData.name,
            tokenId: id,
            price: sectorData.price,
            numerable: false,
            seatNo: seatNo
        } 

        const nft = {
            event: eventData,
            ticket: nftTicketMetada
        }
        return new File([JSON.stringify(nft, null, 2)], id +'.json');
    }
}