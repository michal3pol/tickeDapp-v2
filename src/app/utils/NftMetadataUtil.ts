import { Injectable } from "@angular/core";
import { SectorData } from "src/types/event.model";
import { Attribute, DISPLAY_TYPE, NftEventMetadata, NftTicketMetadata, TRAIT_TYPE } from "src/types/nft.model";

@Injectable({
    providedIn: 'root'
})
export default class NftMetadataUtil {

    createTicketMetadataJson(eventData: NftEventMetadata, sectorData: SectorData, id: number, seatNo?: number) {
        
        const nftTicketMetada: NftTicketMetadata = {
            description: eventData.description,
            image: eventData.image,
            name: "[TICKET] " + eventData.name,
            attributes: [
                this.createAttribute(TRAIT_TYPE.DATE, eventData.date, DISPLAY_TYPE.DATE),
                this.createAttribute(TRAIT_TYPE.PRICE, sectorData.price, DISPLAY_TYPE.NUMBER),
                this.createAttribute(TRAIT_TYPE.SECTOR, sectorData.name),
                this.createAttribute(TRAIT_TYPE.TOKEN_ID, id, DISPLAY_TYPE.NUMBER),
                this.createAttribute(TRAIT_TYPE.SEAT_NO, seatNo, DISPLAY_TYPE.NUMBER)
            ],
            event: eventData
        } 

        return new File([JSON.stringify(nftTicketMetada, null, 2)], id +'.json');
    }

    createAttribute(trait_type: TRAIT_TYPE, data: any, display_type?: DISPLAY_TYPE): Attribute {
        return {
            trait_type: trait_type,
            value: data,
            display_type: display_type
        }
    }

}