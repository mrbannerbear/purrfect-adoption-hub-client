/* eslint-disable react/prop-types */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import useDonations from "../../../../custom/useDonations";

const CheckoutForm = ({ user , amount, setCheckoutTrue, donationId, donatedAmount}) => {

const [error, setError] = useState("");
const [clientSecret, setClientSecret] = useState(null);
const [transactionID, setTransactionID] = useState(null);
const {refetch} = useDonations()


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4200/payment-intent", { price: amount})
      setClientSecret(response.data?.client_secret);
    } catch (error) {
      console.error(error);
    }
  };

  (async () => {
    await fetchData();
  })();
}, [amount]);

const stripe = useStripe();
const elements = useElements();

const handleForm = async (e) => {
  e.preventDefault();
  console.log("clientSecret", clientSecret);

  const card = elements.getElement(CardElement);

  if (!stripe || !elements) {
    return console.log("stripe hook or elements hook missing");
  }

  if (!card) {
    return alert("card null");
  }

  // Use your card Element with other Stripe.js APIs
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card,
  });

  if (error) {
    console.log("[error]", error);
    setError(error);
  } else {
    console.log("[PaymentMethod]", paymentMethod);
  }

  const { paymentIntent, error: confirmError } =
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.name,
          email: user?.email
        },
      },
    });

  if (confirmError) {
    console.log(confirmError);
  } else if (paymentIntent.status === "succeeded") {
    console.log(paymentIntent);
    setTransactionID(paymentIntent.id);

    const paymentDetails = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      donationAmount: amount,
      donationDate: new Date().toISOString()
    };

    axios.post(`http://localhost:4200/donations/${donationId}`, { userDonations: paymentDetails }, { withCredentials: true })
    .then(res => {console.log("posted", res.data);
    axios.patch(`http://localhost:4200/donations/${donationId}`, { donated: amount + parseInt(donatedAmount) } )
.then(res =>{ console.log(res);
refetch()})
.catch(err => console.log(err))
})
    .catch(err => console.log(err))
  }
};


  return (
    <form onSubmit={handleForm} className="my-4">

      <div className="w-full mx-auto ">
        <div className="border rounded-lg shadow-md p-6 relative">
          <h2 className="text-lg font-medium mb-6 text-olive-600">
            Payment Information
          </h2>
          <>
            <div className="mt-8">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <button
                disabled={!stripe || !elements}
                type="submit"
                className="w-full btn1  focus:outline-none mt-4"
              >
                Donate
              </button>
              <button onClick={() => setCheckoutTrue(false)} className="btn1 mt-3">
                    Cancel
              </button>
            </div>
            <div className="w-full text-center text-red-500 text-sm mt-2">
              {!error ? "" : error?.message}
            </div>
            <div className="w-full text-center text-sm mt-2">
              {transactionID && <>Thank you for your contribution!</>}
            </div>
          </>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
