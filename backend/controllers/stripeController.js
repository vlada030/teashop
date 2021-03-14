// stripe default setup
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent =  async (req, res) => {
        const { cart, totalAmount, shipping  } = req.body;
        
        // moj dodatak, proracun ukupne sume i da li su tezine prekoracene
        const {calculateTotals} = req;
        console.log(calculateTotals);

        const calculateOrderAmount = (total, cost) => {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            return total + cost;
          };

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(totalAmount, shipping),
          currency: "usd"
        });
    
        //console.log({ cart, totalAmount, shipping  });
    
        res.status(200).json({
          clientSecret: paymentIntent.client_secret
        });
    }