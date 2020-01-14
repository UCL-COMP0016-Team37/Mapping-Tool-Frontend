import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net';

const API = {
    getGreeting: () => {
        return Axios.get(base_url + '/greeting');
    },

    getMap: (term) => {
        return Promise.resolve({
            data: [
                {
                    location: [13.0827, 80.2707], 
                    title: 'India',
                    description: '78'
                },
                {
                    location:[25.9304, 50.6378], 
                    title: 'Bahrain',
                    description: '10',
                },
            ],
        });
    },

    getSearch: (term) => {
        console.log(term);
        return Promise.resolve({
            data: ['Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus'].map(elem => ({
                title: elem,
                id: `id-${elem.slice(0, 2)}`,
            })),
        });
    },
};

export default API;
