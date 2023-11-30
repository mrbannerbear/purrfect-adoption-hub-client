/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useDonations from "../../../../../../custom/useDonations";
import { AuthProvider } from "../../../../../../context/AuthContext";

const MyDonatedModal = ({ id }) => {
  const { user } = useContext(AuthProvider);
  const { donations, refetch } = useDonations();

  const donators = donations
    .filter((each) => each?._id == id)
    .map((each) => each.userDonations)[0]
    .filter((each) => each?.donorEmail == user?.email);

  const HandleRefund = (amount, date) => {
    let donorEmail = user?.email;
    let donationAmount = parseInt(amount);
    let donationDate = date;
    axios
      .delete(
        `https://purrfect-server.vercel.app/donations/${id}?dlt=dltNested&&donorEmail=${donorEmail}&&donationAmount=${donationAmount}&&donationDate=${donationDate}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast("You have been refunded.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        className="btn1"
        onClick={() =>
          document.getElementById(`my_modal_${id}_myDonations`).showModal()
        }
      >
        See Donations
      </button>
      <dialog id={`my_modal_${id}_myDonations`} className="modal">
        <div className="modal-box rounded-lg">
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="font-poppins"></th>
                  <th className="font-poppins">Date</th>
                  <th className="font-poppins">Amount</th>
                  <th className="font-poppins"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {donators.map((each, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{each?.donationDate}</td>
                    <td>${each?.donationAmount}</td>
                    <td>
                      <button
                        onClick={() =>
                          HandleRefund(each?.donationAmount, each?.donationDate)
                        }
                        className="underline"
                      >
                        Refund
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn1 border-base-content w-24">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default MyDonatedModal;
