import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    @api boatTypeId;
    handleLoading() {
        this.isLoading = true;
    }
    handleDoneLoading() {
        this.isLoading = false;
    }
    @api
    searchBoats(event) {
        this.boatTypeId = event.detail.boatTypeId;
        this.template.querySelector('c-boat-search-results').searchBoats(this.boatTypeId);
    }

    createNewBoat() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new',
            },
        });

    }
}