/* eslint-disable react/prop-types */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckoutForm = ({ user , amount, setCheckoutTrue}) => {
//   const [error, setError] = useState("");
//   const [clientSecret, setClientSecret] = useState(null);
//   const [transactionID, setTransactionID] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         console.log(parseInt(amount))
//       try {
//         const response = await axios.post("http://localhost:4200/payment-intent", { amount: parseInt(amount) });
//         setClientSecret(response.data?.client_secret);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     (async () => {
//       await fetchData();
//     })();

//   }, [amount]);

//   const stripe = useStripe();
//   const elements = useElements();


//   const handleForm = async (e) => {
//     e.preventDefault();
//     console.log("clientSecret", clientSecret);

//     const card = elements.getElement(CardElement);

//     if (!stripe || !elements) {
//       return console.log("stripe hook or elements hook missing");
//     }

//     if (!card) {
//       return alert("card null");
//     }

//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("[error]", error);
//       setError(error);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: user?.displayName,
//             email: user?.email
//           },
//         },
//       });

//     if (confirmError) {
//       console.log(confirmError);
//     } else if (paymentIntent.status === "succeeded") {
//       console.log(paymentIntent);
//       setTransactionID(paymentIntent.id);

//       const paymentDetails = {
//         name: user?.displayName,
//         email: user?.email,
//         amount: amount,
//         date: new Date().toLocaleDateString("en-us", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           timeZone: "UTC",
//         }),
//       };
//     }

//   };

const [error, setError] = useState("");
const [clientSecret, setClientSecret] = useState(null);
const [transactionID, setTransactionID] = useState(null);


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
      name: user?.name,
      email: user?.email,
      date: new Date().toLocaleDateString("en-us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      }),
    };
  }
};


  return (
    <form onSubmit={handleForm}>

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
              <button onClick={() => setCheckoutTrue(false)} className="btn1">
                    Cancel
              </button>
            </div>
            <div className="w-full text-center text-red-500 text-sm mt-2">
              {!error ? "" : error?.message}
            </div>
            <div className="w-full text-center text-sm mt-2">
              {transactionID && <>Booking successful</>}
            </div>
          </>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
