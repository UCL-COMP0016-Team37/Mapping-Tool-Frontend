import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net';

const API = {
    getGreeting: () => {
        return Axios.get(base_url + '/greeting');
    },

    getMap: (term) => {
        return Promise.resolve({
            term,
        });
    },

    getSearch: (term) => {
        console.log(term);
        return Promise.resolve({
            data: ['Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus'].map(el => ({
                title: el,
                id: `id-${el.slice(0, 2)}`,
            })),
        });
    },
};

export default API;
