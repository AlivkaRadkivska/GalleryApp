import axios from 'axios';
const stripe = Stripe(
  'pk_test_51NHmWnBQ6ZBDR4brZTrrzrk7YrPQc9EqhIda33vQUck8NsmWgxahhVL5RvWuIABGbSroZle9eCwUldEW1Wz5hrRP00loSJ7hmY'
);

export const buyPicture = async (id) => {
  try {
    const session = await axios(`http://localhost:3000/api/bought/checkout-session/${id}`);
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
