/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import { Formik, Field, Form } from 'formik';

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../context/AuthContext";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const DonationModal = () => {
  const { user } = useContext(AuthProvider);
  const [amount, setAmount] = useState(null)
  const [checkoutTrue, setCheckoutTrue] = useState(false)

  const stripePromise = loadStripe(
    "pk_test_51OExdgCibCkEW5UbewvmExxjnDfWjoOqrT4LgVsQlQkvYiOvTNALjs2nA2RLfA47I5kXSrXBquj4cI5tSQyp9Mhn00SMQzWNWN"
  );

  const HandleProceed = (e) => {
    e.preventDefault()
    setAmount(parseInt(e.target.Amount.value))
    console.log(amount)
    setCheckoutTrue(true)
  }

  return (
    <div>
      <button
        className="lg:w-40 btn1 border-base-content"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Donate
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-lg">
        <form onSubmit={HandleProceed}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            name="Name"
            type="text"
            className="input input-bordered  rounded-lg focus:outline-none"
            defaultValue={user?.displayName}
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="Email"
            type="email"
            className="input input-bordered  rounded-lg focus:outline-none"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Amount</span>
          </label>
          <input
            name="Amount"
            type="number"
            className="input input-bordered  rounded-lg focus:outline-none outline-none"
          />
        </div>

        <div className="modal-action">
            <button className="btn1">Proceed</button>
        </div>
      </form>
          {checkoutTrue === true && amount !== null &&  (<Elements stripe={stripePromise}>
          <CheckoutForm user={user} amount={amount} setCheckoutTrue={setCheckoutTrue}></CheckoutForm>
          </Elements>)}
          <form method="dialog" className="mt-6">
              <button className="btn1 border-base-content w-24">Close</button>
            </form>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default DonationModal;
