export const formatPrice = (number) => {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD'
    }).format(number);
}

export const getUniqueValues = (data, dataField) => {
    let unique = data.map(product => product[dataField]);

    // ova dva polja su Array , ya raliku od iznad koje je string
    if (dataField === 'filter' || dataField === 'package') {
        unique = unique.flat();
    }

    // localeCompare sortira i stringove i brojeve 
    unique = [...new Set(unique)].sort((a,b) => {
        return  a.localeCompare(b)
    });
    
    return ['svi', ...unique];
}

export const priceCalculator = (unit, fullPrice) => {
    const basePrice = fullPrice / 100;

    switch(unit) {
        case '100': {
            return (basePrice * 10);        
        }

        case '50': {
            return (basePrice * 6);
        }

        case '30': {
            return (basePrice * 5);
        }

        default : {
            return basePrice
        }
    }
}
