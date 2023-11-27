/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../../../../context/AuthContext";
import useDonations from "../../../../../../../custom/useDonations";

const PauseModal = ({ paused, id }) => {
  const { user } = useContext(AuthProvider);
  const { refetch } = useDonations();

  let status = paused ? false : true;

  const HandlePause = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4200/donations/${id}`, {
        donationPaused: status,
      })
      .then((res) => {
        console.log(res);
        refetch()
        if(res.data.modifiedCount > 0){
            refetch();
            toast("Status changed successfully")
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <button
        className="text-[10px] text-gray-600"
        onClick={() => document.getElementById(`my_modal_${id}`).showModal()}
      >
        Edit
      </button>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={HandlePause}>
            <>
              <div className="form-control">
                <h2 className="text-center py-3 font-medium text-xl">
                  Change Status to Pause/Ongoing?
                </h2>
                <label className="label">
                  <span className="label-text text-lg">Paused:</span>
                </label>
                <input
                  name="Name"
                  type="text"
                  className="input input-bordered  rounded-lg focus:outline-none"
                  defaultValue={paused}
                  readOnly
                />
                <span className="text-center py-4 text-lg">
                  This donation campaign's status will change to{" "}
                  {paused ? "Paused: False" : "Paused: True"}
                </span>
              </div>

              <div className="modal-action">
                <button className="btn1 border-base-content w-24">
                  Confirm
                </button>
                <form method="dialog">
                  <button className="btn1 border-base-content w-24">
                    Close
                  </button>
                </form>
              </div>
            </>
          </form>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default PauseModal;
