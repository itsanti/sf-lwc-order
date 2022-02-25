import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ORDER_OBJECT from '@salesforce/schema/Order__c';



/**
 * Creates Order records.
 */
export default class OrderCreator extends LightningElement {

    orderObject = ORDER_OBJECT;
    accountId;

    handleSearchValue(evt) {
        console.log('handleSearchValue');
        this.accountId = evt.detail;
    }


    handleSelectedLookup(event) {
        console.log('handleSelectedLookup');
        console.log(event.target.value);
        this.accountId = event.target.value;
    }

    handleOrderCreated(event) {
        const payload = event.detail;
        console.log(JSON.stringify(payload));
        
        const toast = new ShowToastEvent({
            title: 'new orider',
            message: 'new orider created',
            variant: 'success'
        });
        this.dispatchEvent(toast);
    }

    handleSubmit(event){
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Client__c = this.accountId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
}