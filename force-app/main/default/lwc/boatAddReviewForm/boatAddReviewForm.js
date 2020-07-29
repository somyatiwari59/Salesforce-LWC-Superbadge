import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const TOAST_TITLE = 'Review Created!';
const TOAST_SUCCESS_VARIANT = 'success';
export default class BoatAddReviewForm extends LightningElement {
    boatId;
    rating;
    @api
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        this.boatId = value;
    }
    // Gets user rating input from stars component
    handleRatingChanged(event) {
        this.rating = event.detail;
    }

    // Custom submission handler to properly set Rating
    // This function must prevent the anchor element from navigating to a URL.
    // form to be submitted: lightning-record-edit-form
    handleSubmit(event) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Rating__c = this.rating;
        fields.Boat__c = this.boatId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    // Shows a toast message once form is submitted successfully
    // Dispatches event when a review is created
    handleSuccess() {
        this.dispatchEvent(new ShowToastEvent({
            title: TOAST_TITLE,
            variant: TOAST_SUCCESS_VARIANT
        }));
        this.dispatchEvent(new CustomEvent('createreview'));
        this.handleReset();
    }

    // Clears form data upon submission
    // TODO: it must reset each lightning-input-field
    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}
