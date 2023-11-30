/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useContext } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../../../../context/AuthContext";
import useAdoptionRequests from "../../../../../../../custom/useAdoptionRequests";

const AdoptionReqModal = ({ paused, id }) => {
  const { user } = useContext(AuthProvider);
  const { refetch } = useAdoptionRequests();

  const { requests } = useAdoptionRequests()
  const myRequests = requests.filter(each => each?.petID === id)

  let status = paused ? false : true;

  const HandleReject = (e, _id) => {
    e.preventDefault();
    axios
      .delete(`https://purrfect-server.vercel.app/adoption-requests/${_id}`)
      .then((res) => {
        console.log(res.data);
        if(res.data.deletedCount > 0){
            refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const HandleAccept = (e, _id) => {
    e.preventDefault()
    axios.patch(`https://purrfect-server.vercel.app/all-pets/${id}`, { adopted: true })
    .then(() => {
        axios
        .delete(`https://purrfect-server.vercel.app/adoption-requests/${_id}`)
        .then((res) => {
          console.log(res.data);
          if(res.data.deletedCount > 0){
              refetch();
          }
        })
        .catch((err) => console.log(err));
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <button
        className="btn1"
        onClick={() => document.getElementById(`my_modal_${id}_adoption-req`).showModal()}
      >
        Requestors
      </button>
      <dialog id={`my_modal_${id}_adoption-req`} className="modal">
        <div className="modal-box max-w-[60em] rounded-lg">
          <form className="card-body">
            <>
        

            <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="font-poppins"></th>
                <th className="font-poppins">Name</th>
                <th className="font-poppins">Email</th>
                <th className="font-poppins">Phone</th>
                <th className="font-poppins">Location</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myRequests.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {each?.name}
                  </td>
                  <td>
                    {each?.email}
                  </td>
                  <td>
                    {each?.phone}
                  </td>
                  <td>
                    {each?.location}
                  </td>
                  <td><button className="btn1" onClick={() => HandleAccept(event, each?._id)}>Accept</button></td>
                  <td><button className="btn1" onClick={() => HandleReject(event, each?._id)}>Reject</button></td>
                
                </tr>
              ))}
            </tbody>
          </table>

             
            </>
          </form>
          <div className="modal-action">
                <form method="dialog">
                  <button className="btn1 border-base-content w-24">
                    Close
                  </button>
                </form>
              </div>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default AdoptionReqModal;
