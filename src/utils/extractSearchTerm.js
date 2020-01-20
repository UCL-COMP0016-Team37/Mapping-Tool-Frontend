export default function extractSearchTerm(search, parameterKey) {
    const parameters = search.split('?')[1];
    if (parameters === undefined) {
        return '';
    }
    const result = parameters.split('&').find(parameter => {
        const key = parameter.split('=')[0];
        return key === parameterKey;
    });
    if (result === undefined) {
        return '';
    }
    return result.split('=')[1];
}