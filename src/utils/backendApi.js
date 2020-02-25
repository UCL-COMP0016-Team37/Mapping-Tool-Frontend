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
        const newpage = parseInt(page)
        return Axios.get(base_url + '/v2/maps/pin/' + term + '/' + newpage);//0/100
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

    getMap: (term) => {
        // console.log(term)
        if (term === undefined){
            return Promise.resolve({
                data : mapdata,
            });
        }
        else{
            const datareturn = mapdata.filter(city => city.title === term);
            return Promise.resolve({
                data : datareturn,
            });}
    },
};

export default API;

const mapdata = [
    {
        latitude: 23.6850,
        longitude: 90.3563,
        title: 'Bangladesh',
        description: '81',
    },
    {
        latitude:4.5709,
        longitude: -74.2973,
        title: 'Colombia',
        description: '10',
    },
    {
        latitude:7.9465,
        longitude: -1.0232,
        title: 'Ghana',
        description: '53',
    },
    {
        latitude:12.2383,
        longitude: -1.5616,
        title: 'Burkina Faso',
        description: '17',
    },
    {
        latitude:12.8654,
        longitude: -85.2072,
        title: 'Nicaragua',
        description: '12',
    },
    {
        latitude: -1.9403,
        longitude: 29.8739,
        title: 'Rwanda',
        description: '9',
    },
    {
        latitude:17.5707,
        longitude: 3.9962,
        title: 'Mali',
        description: '8',
    },
    {
        latitude:1.3733,
        longitude: 32.2903,
        title: 'Uganda',
        description: '38',
    },
    {
        latitude:9.1450,
        longitude: 40.4897,
        title: 'Ethiopia',
        description: '36',
    },
    {
        latitude:33.2232,
        longitude:  43.6793,
        title: 'Iraq',
        description: '11',
    },
    {
        latitude:-0.0236,
        longitude:  37.9062,
        title: 'Kenya',
        description: '40',
    },
    {
        latitude:33.8547,
        longitude:  35.8623,
        title: 'Lebanon',
        description: '8',
    },
    {
        latitude:43.9159,
        longitude:  17.6791,
        title: 'Bosnia and Herzegovina',
        description: '1',
    },
    {
        latitude:7.8731,
        longitude:  80.7718,
        title: 'Sri Lanka',
        description: '9',
    },
    {
        latitude:14.4974,
        longitude: -14.4524,
        title: 'Senegal',
        description: '14',
    },
    {
        latitude:-4.0383,
        longitude: 21.7587,
        title: 'Democratic Republic of Congo',
        description: '17',
    },
    {
        latitude: 15.7835,
        longitude: -90.2308,
        title: 'Guatemala',
        description: '17',
    },
    {
        latitude:18.9712,
        longitude: -72.2852,
        title: 'Haiti',
        description: '28',
    },
    {
        latitude:-18.6657,
        longitude: 35.5296,
        title: 'Mozambique',
        description: '10',
    },
    {
        latitude:37.0902,
        longitude: -95.7129,
        title: 'United States',
        description: '20',
    },
    {
        latitude:6.8770,
        longitude: 31.3070,
        title: 'South Sudan',
        description: '10',
    },
    {
        latitude: 18.1096,
        longitude: -77.2975,
        title: 'Jamaica',
        description: '6',
    },
    {
        latitude:12.8797,
        longitude: 121.7740,
        title: 'Philipphines',
        description: '11',
    },
    {
        latitude:-13.7590,
        longitude: -172.1046,
        title: 'samoa',
        description: '1',
    },
    {
        latitude:5.1521,
        longitude: 46.1996,
        title: 'Somalia',
        description: '7',
    },
    {
        latitude:-38.4161,
        longitude:  -63.6167,
        title: 'Argentina',
        description: '1',
    },
    {
        latitude:7.3697,
        longitude:  12.3547,
        title: 'Cameroon',
        description: '2',
    },
    {
        latitude:-1.8312,
        longitude:  -78.1834,
        title: 'Ecuador',
        description: '4',
    },
    {
        latitude:13.7942,
        longitude:  -88.8965,
        title: 'El Savador',
        description: '9',
    },
    {
        latitude:4.8604,
        longitude: -58.9302,
        title: 'Guyana',
        description: '3',
    },
    {
        latitude:15.2000,
        longitude: -86.2419,
        title: 'Honduras',
        description: '18',
    },
    {
        latitude:6.42811,
        longitude: -9.4295,
        title: 'Liberia',
        description: '5',
    },
    {
        latitude:35.8617,
        longitude: 104.1954,
        title: 'China',
        description: '4',
    },
    {
        latitude: 13.0827,
        longitude: 80.2707,
        title: 'India',
        description: '96',
    },
    {
        latitude:34.8021,
        longitude: 38.9968,
        title: 'Syria',
        description: '3',
    },
];

