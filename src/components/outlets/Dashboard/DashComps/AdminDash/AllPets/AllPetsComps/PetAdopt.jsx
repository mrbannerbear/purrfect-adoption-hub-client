/* eslint-disable react/prop-types */
// import { Formik, Field, Form } from 'formik';

import { MdEdit } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import usePets from "../../../../../../../custom/usePets";


const PetAdopt = ({ id }) => {

  const { refetch, pets } = usePets()

  const pet = pets.find(each => each._id === id)

  const HandleAdopt = (e) => {
    e.preventDefault();
    axios
      .patch(`https://purrfect-server.vercel.app/all-pets/${id}`, { adopted: pet?.adopted == "true" ? "false" : "true"})
      .then((res) => {
        console.log(res);
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
        className="text-xs text-gray-700"
        onClick={() => document.getElementById(`my_modal_${id}_petsAdoptStatus`).showModal()}
      >
        <MdEdit></MdEdit>
      </button>
      <dialog id={`my_modal_${id}_petsAdoptStatus`} className="modal">
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={HandleAdopt}>
            <>
              <div className="form-control">
                <h2 className="text-center py-3 font-medium text-xl">
                 You will change the adopted status. Proceed?
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

export default PetAdopt;
