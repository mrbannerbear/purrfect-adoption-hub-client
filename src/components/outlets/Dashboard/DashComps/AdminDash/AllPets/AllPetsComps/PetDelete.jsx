/* eslint-disable react/prop-types */
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import usePets from "../../../../../../../custom/usePets";

const PetDelete = ({ id }) => {

  const { refetch } = usePets()

  const HandleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`https://purrfect-server.vercel.app/all-pets/${id}`,)
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
        onClick={() => document.getElementById(`my_modal_${id}_pets`).showModal()}
      >
        Delete
      </button>
      <dialog id={`my_modal_${id}_pets`} className="modal">
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={HandleDelete}>
            <>
              <div className="form-control">
                <h2 className="text-center py-3 font-medium text-xl">
                 Are You Sure You Want to Delete This Pet?
                </h2>
              </div>

              <div className="modal-action">
                <button className="btn1 border-base-content w-24">
                  Yes
                </button>
                <form method="dialog">
                  <button className="btn1 border-base-content w-24">
                    No
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

export default PetDelete;
