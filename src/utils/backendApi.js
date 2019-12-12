import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net';

const API = {
    getMap: () => {
        return Axios.get(base_url + '/greeting');
    },
    getSearch: (term) => {
        console.log(term);
        return Promise.resolve({
            data: ["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria",
            "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus"].map(el => ({title: el})),
        });
    },
};

export default API;
