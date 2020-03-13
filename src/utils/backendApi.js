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
        return Axios.get(base_url + '/v2/publisher/');
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

    // getGeocode: () => {
    //     return Axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/United%20States%20of%20America.json?access_token='+ API_KEY);
    // },
};

export default API;