export function formatMoney(amount, currency) {
    if (amount === undefined) {
        return '';
    }
    return `${mapCurrencySymbol(currency)} ${splitThousands(amount, ',')} ${currency}`;
}

function mapCurrencySymbol(currencyCode) {
    switch (currencyCode.toUpperCase()) {
    case 'USD': return '$';
    case 'GBP': return '£';
    default: return '';
    }
}

function splitThousands(value, character = ' ', splitCount = 3) {
    if (value === null){
        value = 'not provided';
        return value;
    }
    if (typeof value ==='string') {
        value = parseFloat(value);
    }
    value = value.toString();
    let decimalIndex = value.indexOf('.');
    if (decimalIndex === -1) {
        decimalIndex = value.length;
    }
    decimalIndex -= splitCount;
    while (decimalIndex > 0) {
        value = value.slice(0, decimalIndex) + character + value.slice(decimalIndex);
        decimalIndex -= splitCount;
    }
    return value;
}