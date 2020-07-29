// imports
import { LightningElement, track, wire, api } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
import { publish, subscribe, unsubscribe, createMessageContext, releaseMessageContext } from 'lightning/messageService';
import BMC from "@salesforce/messageChannel/BoatMessageChannel__c";
export default class boatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    error = undefined;
    @track searchOptions;
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        console.log(error);
        if (data) {
            this.searchOptions = [];
            for (const type of data) {
                const option = {
                    label: type.Name,
                    value: type.Id
                };
                this.searchOptions.push(option);
            }
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    };
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent('search', {
            detail: { boatTypeId: this.selectedBoatTypeId }
        });
        this.dispatchEvent(searchEvent);
    }
}