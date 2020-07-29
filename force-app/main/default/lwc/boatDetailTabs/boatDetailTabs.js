import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import BOAT_API_NAME from '@salesforce/schema/Boat__c';
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";
import { refresh } from 'c/boatReviews';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];
export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
    boatId;
    @wire(getRecord, { recordId: '$boatId', BOAT_FIELDS })
    wiredRecord;
    @wire(MessageContext)
    messageContext;
    label = {
        labelDetails,
        labelReviews,
        labelAddReview,
        labelFullDetails,
        labelPleaseSelectABoat,
    };
    get detailsTabIconName() {
        return this.wiredRecord.data ? 'utility:anchor' : null;
    }
    get boatName() {
        return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
    }

    // Private
    subscription = null;

    // Subscribe to the message channel
    subscribeMC() {
        if (this.boatId) {

            const message = {
                recordId: boatId
            };
            if (!this.subscription) {
                this.subscription = subscribe(
                    this.messageContext,
                    BOATMC,
                    message,
                    { scope: APPLICATION_SCOPE }
                );
            }
        }
    }

    // Calls subscribeMC()
    connectedCallback() {
        this.subscribeMC();
    }
    navigateToRecordViewPage() {
        let recId = this.boatId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recId,
                ObjectApiName: 'Boat__c',
                actionName: 'view'
            }
        });

    }
    handleReviewCreated() {
        this.template.querySelector('lightning-tabset').activeTabValue = 'Reviews';
        this.template.querySelector('c-boat-reviews').refresh();
    }
}
