/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../context/AuthContext";

const Modal = () => {
const {user} = useContext(AuthProvider)


  const HandleAdopt = (e) => {
    e.preventDefault()
    console.log(e)
  }   


  return (
    <div>

      <button
        className="lg:w-40 btn1 border-base-content"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Adopt
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={HandleAdopt} >

            <>
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
                <span className="label-text">Phone Number</span>
              </label>
              <input
                name="Phone"
                type="tel"
                className="input input-bordered  rounded-lg focus:outline-none outline-none"

              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                name="Address"
                type="text"
                className="input input-bordered  rounded-lg focus:outline-none outline-none"

              />
            </div>

            <div className="modal-action">
              <button className="btn1 border-base-content w-24">Submit</button>
              <form method="dialog">
                <button className="btn1 border-base-content w-24">Close</button>
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

export default Modal;
