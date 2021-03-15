const Singles = require('../models/singlesModel');

// povuci podatke iz baze na osnovu sifre proizvoda i izvrsi proveru poslate ukupne cene i proracunate ovde
const returnStockList = async (cartArr) => await Promise.all(cartArr.map(async(item) => {
    const id = item.id.substring(0,5);
    
    const data = await Singles.findOne({id});
    return data;
}));

exports.calculateOrderAmount = async(req, res, next) => {
    const { cart, totalAmount, shipping  } = req.body;

    // konsoliduj cart - proveri da li postoje porizvodi sa istom sifrom, ali razlicita pakovanja
    const updatedCart = cart.map(item => {
        const id = item.id.substring(0,5);
        const unit = parseInt(item.id.substring(5, 8));
        return {id, weight: item.amount * unit, price: item.price * item.amount}
    }).reduce((arr, item) => {
        const ind = arr.findIndex(arrItem => arrItem.id === item.id);

        if ( ind > -1 ) {
            const tempItem = {...arr[ind]};
            tempItem.weight = tempItem.weight + item.weight;
            tempItem.price = tempItem.price + item.price;
            arr[ind] = tempItem;
            return arr;

        } else {
           arr.push(item);
           return arr;
        }
    }, []);

    // pronadji originalne itemse u bazi
    const stockList = await returnStockList(updatedCart);

    // izvrsi validaciju porucene tezine / stocka i ukupne sume koju treba naplatiti
    const final = updatedCart.reduce((obj, item) => {

        const cartItem = stockList.find(cartItem => cartItem.id === item.id);
        const orderedWeightIsValid = obj.orderedWeightIsValid && cartItem.stock >= item.weight;

        return {
            totalPrice: (obj.totalPrice += item.price),
            orderedWeightIsValid,
        }; 
    }, {
        totalPrice: 0,
        orderedWeightIsValid: true
    });

    // proveri da li je manipulisano sa podacima poslatih sa frontenda, ako nije produzi na stripe middleware
    if (!(totalAmount === final.totalPrice && final.orderedWeightIsValid)) {
        res.status(400).send('GRESKA');
    } else {
        next();    
    }
    
    // res.status(200).json({
    //     success: true,
    //     data: {final}
    // })
}