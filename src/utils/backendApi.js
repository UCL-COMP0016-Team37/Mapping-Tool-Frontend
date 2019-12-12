import Axios from 'axios';

const base_url = 'https://mapping-tool-api.azurewebsites.net';

const API = {
    getMap: () => {
        return Axios.get(base_url + '/greeting');
    },
    getSearch: (term) => {
        console.log(term);
        return Promise.resolve({
            data: [
                {
                    title: 'Project Test',
                    description: 'ASJDOASDasdlaslkdajsdlkasdlkasdjalskd',
                },
                {
                    title: 'Project Test 2',
                    description: 'tjasdajldalkjsdaklsdlkjasdl',
                },
            ],
        });
    },
};

export default API;
