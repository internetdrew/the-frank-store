// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateAmount = ({ subtotal, checkoutDiscount, shippingRate }) => {
  const sub = parseInt(subtotal * 100);
  const discount = parseInt(checkoutDiscount * 100);
  const shipping = parseInt(shippingRate * 100);
  return sub + shipping - discount;
};

export default async function handler(req, res) {
  const { subtotal, checkoutDiscount, shippingRate } = JSON.parse(req.body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateAmount({ subtotal, checkoutDiscount, shippingRate }),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const cartItems = req.body;

//     try {
//       // Create Checkout Sessions from body params.
//       const params = {
//         submit_type: 'pay',
//         payment_method_types: ['card'],
//         shipping_options: [
//           {
//             shipping_rate: 'shr_1MkFTXFI7xSDre26oH7W7t6s',
//           },
//         ],
//         line_items: cartItems.map(item => {
//           const imgRef = item?.image.asset._ref;
//           const image = imgRef
//             .replace(
//               'image-',
//               'https://cdn.sanity.io/images/05od4y7z/production/'
//             )
//             .replace('-jpg', '.jpg');

//           return {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: `${item.title} Frank`,
//                 images: [image],
//               },
//               unit_amount: item.price * 100,
//             },
//             quantity: item.qty,
//             adjustable_quantity: {
//               enabled: true,
//               minimum: 1,
//             },
//           };
//         }),
//         mode: 'payment',
//         success_url: `${req.headers.origin}/confirmed`,
//         cancel_url: `${req.headers.origin}/cart`,
//       };
//       const session = await stripe.checkout.sessions.create(params);
//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
