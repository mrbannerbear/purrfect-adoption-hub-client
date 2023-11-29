/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useDonations from "../../../../../../custom/useDonations";
import { AuthProvider } from "../../../../../../context/AuthContext";

const DonatorsModal = ({ paused, id }) => {
  const { user } = useContext(AuthProvider);
  const { donations } = useDonations();

    const donators = donations.filter(each => each?._id == id).map(each => each.userDonations)[0]
    console.log(donators)

  return (
    <div>
      <button
        className="btn1"
        onClick={() => document.getElementById(`my_modal_${id}_donators`).showModal()}
      >
        Donators
      </button>
      <dialog id={`my_modal_${id}_donators`} className="modal">
        <div className="modal-box rounded-lg">
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="font-poppins"></th>
                <th className="font-poppins">Name</th>
                <th className="font-poppins">Amount</th>
                <th className="font-poppins">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {donators.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {each?.donorName}
                  </td>
                  <td>${each?.donationAmount}</td>
                  <td>
                    {each?.donationDate}
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

export default DonatorsModal;
