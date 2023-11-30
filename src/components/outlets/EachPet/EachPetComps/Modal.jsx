/* eslint-disable react/prop-types */
import { useContext } from "react";
// import { Formik, Field, Form } from 'formik';

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../context/AuthContext";
import useAdoptionRequests from "../../../../custom/useAdoptionRequests";

const Modal = ({id, adderEmail}) => {
  const { user } = useContext(AuthProvider);
  const {requests} = useAdoptionRequests()

  const existingReq = requests.find(each => each?.petID == id && each?.email === user?.email)

  const HandleAdopt = (e) => {
    e.preventDefault();
    const name = e.target.Name.value;
    const email = e.target.Email.value;
    const phone = e.target.Phone.value;
    const location = e.target.Location.value;

    const values = { name, email, phone, location, petID: id, adderEmail: adderEmail };

    if(existingReq){
      return toast("You have already requested for adoption")
    }

    // console.log(values)

    axios
      .post("http://localhost:4200/adoption-requests", values, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast("Request Added in Queue");
      })
      .then((err) => console.log(err));
  };

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
          <form className="card-body" onSubmit={HandleAdopt}>
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  required
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
                  required
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
                  required
                  name="Phone"
                  type="tel"
                  className="input input-bordered  rounded-lg focus:outline-none outline-none"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  required
                  name="Location"
                  type="text"
                  className="input input-bordered  rounded-lg focus:outline-none outline-none"
                />
              </div>

              <div className="modal-action">
                <button className="btn1 border-base-content w-40">
                  Request Adoption
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

export default Modal;
