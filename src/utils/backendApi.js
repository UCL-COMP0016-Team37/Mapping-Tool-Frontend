import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net/api';

const API = {
    getGreeting: () => {
        return Axios.get(base_url + '/greeting');
    },

    getProjects: (id) => {
        return Axios.get(base_url+ '/v2/activities/'+ id);
    },

    getSearch: (term,page) => {
        console.log(term);
        const newpage = parseInt(page)-1;
        return Axios.get(base_url + '/v2/filter/' + term + '/' + newpage);
    },

    getpublisher: () => {
        return Axios.get(base_url + '/v2/publishers/');
    },

    getMapPin: (term) => {
        const url = base_url + '/v2/maps/pin/';
        if (term === undefined){
            return Axios.get(url);
        }
        return Axios.get(url + term);
    },

    getCountry: (term) => {
        return Axios.get(base_url+ '/v2/countries/'+term);
    },

    getTransactions: (id) => {
        return Axios.get(base_url + '/v2/transactions/' + id);
    },

    getTopHundred: () => {
        return Axios.get(base_url + '/v2/analysis/topOrgs');
    },

    getSectorInCountryAnalysis: (country) =>{
        return Axios.get(base_url + '/v2/analysis/sector-in-country/' + country);
    },

    getTopOrgsPerCountry: (country) => {
        return Axios.get(base_url + '/v2/analysis/topOrgs/country=' + country);
    },

    getTopOrgsinCountry: (country,sector) => {
        return Axios.get(base_url + '/v2/analysis/topOrgs/sector=' + sector + '&country=' + country);
    },

    getTopDonorPerOrg: (sector) => {
        return Axios.get(base_url + '/v2/analysis/transaction-from-org/'+ sector );
    },

    getTopReceiverPerOrg: (sector) => {
        return Axios.get(base_url + '/v2/analysis/transaction-to-org/' + sector);
    },

    getTopReceiverPerSector: (sector) => {
        return Axios.get(base_url + '/v2/analysis/budget-to-country/' + sector);
    },

    getHeatMap: (sector) => {
        return Axios.get(base_url + '/v2/maps/pin/filter/sector/' + sector);
    },
};

export default API;