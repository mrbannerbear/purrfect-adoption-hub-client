/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../../../../context/AuthContext";
import useDonations from "../../../../../../../custom/useDonations";

const DeleteModal = ({ paused, id }) => {
  const { user } = useContext(AuthProvider);
  const { refetch } = useDonations();

  let status = paused ? false : true;

  const HandleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4200/donations/${id}`,)
      .then((res) => {
        console.log(res);
        if(res.data.deletedCount > 0){
            refetch();
            toast("Deleted successfully")
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <button
        className="btn1"
        onClick={() => document.getElementById(`my_modal_${id}1`).showModal()}
      >
        Delete
      </button>
      <dialog id={`my_modal_${id}1`} className="modal">
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={HandleDelete}>
            <>
              <div className="form-control">
                <h2 className="text-center py-3 font-medium text-xl">
                 Are You Sure You Want to Delete This Donation?
                </h2>
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

export default DeleteModal;
