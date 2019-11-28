import Axios from 'axios';

const base_url = '';

const API = {
    getMap: () => {
        return Axios.get(base_url + '/map');
    },
};

export default API;
