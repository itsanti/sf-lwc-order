import { LightningElement, wire, api } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';

const DELAY = 500;

export default class LookupSearch extends LightningElement {
    queryTerm;

    @wire( fetchAccounts, { Name: '$queryTerm' })
    contacts;

    handleClick(evt) {
        this.template.querySelector('lightning-input').value = evt.currentTarget.dataset.cid;
        this.template.querySelector('.slds-combobox').classList.remove("slds-is-open");
        
        const searchEvent = new CustomEvent('getsearchvalue', {detail: evt.currentTarget.dataset.cid});
        this.dispatchEvent(searchEvent);
    }

    handleSearch(evt) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = evt.target.value;
        if (!searchKey) {
            return;
        }
        this.delayTimeout = setTimeout(() => {
            this.queryTerm = searchKey;
            this.template.querySelector('.slds-combobox').classList.add("slds-is-open");
        }, DELAY);
    }

}