export const formatPrice = (number) => {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD'
    }).format(number/10);
}

export const getUniqueValues = () => {}
