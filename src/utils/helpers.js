export const formatPrice = (number) => {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD'
    }).format(number/10);
}

export const getUniqueValues = () => {}

export const priceCalculator = (unit, fullPrice) => {
    switch(unit) {
        case '100': {
            return fullPrice / 100 * 10        
        }

        case '50': {
            return fullPrice / 100 * 6
        }

        case '30': {
            return fullPrice / 100 * 4
        }

        default : return fullPrice / unit
    }
}
