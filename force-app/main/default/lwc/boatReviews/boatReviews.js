import { LightningElement, api } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews';
import { NavigationMixin } from 'lightning/navigation';
// imports
export default class BoatReviews extends NavigationMixin(LightningElement) {
    // Private
    boatId;
    error;
    boatReviews;
    isLoading;

    @api
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        this.boatId = value;
        this.getReviews();
    }

    // Getter to determine if there are reviews to display
    get reviewsToShow() {
        if (this.boatReviews)
            return true;
        else
            return false;
    }

    // Public method to force a refresh of the reviews invoking getReviews
    @api
    refresh() {
        this.getReviews();
    }

    getReviews() {
        if (this.boatId) {
            this.isLoading = true;
            getAllReviews({ boatId: this.boatId })
                .then(result => {
                    this.boatReviews = result;
                })
                .catch(error => {
                    this.error = error;
                });
            this.isLoading = false;
        }
        return;
    }

    // Helper method to use NavigationMixin to navigate to a given record on click
    navigateToRecord(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.recordId,
                objectApiName: 'User',
                actionName: 'view'
            },
        });

    }
}
