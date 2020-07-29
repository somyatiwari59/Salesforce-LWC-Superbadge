import { LightningElement, api, wire, track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";

export default class BoatTile extends LightningElement {
    @wire(MessageContext)
    messageContext;
    @api boat;
    @api selectedBoatId;
    @track boatId;
    get backgroundStyle() {
        return `background-image: url(${this.boat.Picture__c})`;
    }
    get tileClass() {
        const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
        const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
        if (this.selectedBoatId != this.boat.Id) {
            return TILE_WRAPPER_UNSELECTED_CLASS;
        }
        else {
            return TILE_WRAPPER_SELECTED_CLASS;
        }
    }

    // Fires event with the Id of the boat that has been selected.
    selectBoat() {
        this.boatId = this.boat.Id;
        const boatselectEvent = new CustomEvent('boatselect', {
            detail: { boatId: this.boatId }
        });
        this.dispatchEvent(boatselectEvent);

    }
}