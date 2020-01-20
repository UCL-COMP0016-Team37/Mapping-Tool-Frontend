import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net/api/v1/projects';

const API = {
    getGreeting: () => {
        return Axios.get(base_url + '/greeting');
    },

    getTrying:()=>{
        return Axios.get(base_url+'/');
    },

    getMap: () => {
        return Promise.resolve({
            data: [
                {
                    index: 1,
                    latitude: 13.0827,
                    longitude: 80.2707, 
                    title: 'India',
                    description: '78',
                },
                {
                    index: 2,
                    latitude:25.9304,
                    longitude: 50.6378, 
                    title: 'Bahrain',
                    description: '10',
                },
                {
                    index: 3,
                    latitude:35.1667, 
                    longitude: 33.3667, 
                    title: 'Cyprus',
                    description: '12',
                },
                {
                    index: 4,
                    latitude:35.8617, 
                    longitude: 104.1954, 
                    title: 'China',
                    description: '125',
                },
                {
                    index: 5,
                    latitude:61.5240, 
                    longitude: 105.3188, 
                    title: 'Russia',
                    description: '70',
                },
                {
                    index: 6,
                    latitude:37.0902, 
                    longitude: -95.7129, 
                    title: 'United States',
                    description: '79',
                },
                {
                    index: 7,
                    latitude:34.8021, 
                    longitude: 38.9968, 
                    title: 'Syria',
                    description: '120',
                },{
                    index: 8,
                    latitude:6.4238, 
                    longitude: -66.5897, 
                    title: 'Venezuela',
                    description: '80',
                },
                {
                    index: 9,
                    latitude:55.3781, 
                    longitude: -3.4360, 
                    title: 'United Kingdom',
                    description: '12',
                },
                {
                    index: 10,
                    latitude:-25.2744,
                    longitude:  133.7751, 
                    title: 'Australia',
                    description: '27',
                },
            ],
        });
    },

    getSearch: (term) => {
        console.log(term);
        return Axios.get(base_url+'/0/100');
        // return Promise.resolve({
        //     data: ['Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus'].map(elem => ({
        //         title: elem,
        //         id: `id-${elem.slice(0, 2)}`,
        //     })),
        // });
    },
};

export default API;
