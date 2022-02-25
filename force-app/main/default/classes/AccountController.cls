public with sharing class AccountController {
 
    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchAccounts(String Name) {
     
        String nameLike = '%' + Name + '%';
        List<Contact> res = [ SELECT AccountId, Name FROM Contact where Name Like :nameLike ];
        // for(Contact r: res) {
        //     System.debug(r.Name);
        // }
        return res;
         
    }
     
}