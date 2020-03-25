export default function extractTerm(parameters,parameterKey){
    if (parameters === undefined) {
        return '';
    }
    const result = parameters.split('AND%20').find(parameter => {
        const key = parameter.split('%3A(')[0];
        return key === parameterKey;
    });
    if (result === undefined) {
        return '';
    }
    return result.split('%3A(')[1].slice(0,-1);
}
