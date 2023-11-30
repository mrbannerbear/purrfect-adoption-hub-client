/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../../../context/AuthContext";
import useUsers from "../../../../../../custom/useUsers";

const AdminModal = ({ email, name, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultRole, setRole] = useState(role)

  const { users, refetch } = useUsers()

  const user = users.find(user => user.email === email)

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = (e) => {
    handleRoleChange(e)
  }

  const handleRoleChange = (e) => {
    e.preventDefault()
    const role = e.target.Role.value
    console.log(role);
    axios.patch(`https://purrfect-server.vercel.app/users/${user._id}`, { role })
    .then(res => {console.log(res)
      setRole(role)
    refetch()}).catch(err => console.log(err))
    
  };

  return (
    <div>
      <button className="" onClick={handleOpen}>
        <MdEdit></MdEdit>
      </button>
      <dialog id={`my_modal_${email}`} className="modal" open={isOpen}>
        <div className="modal-box rounded-lg">
          <form className="card-body" onSubmit={handleConfirm}>
            <div>
                <h2 className="text-center font-medium text-xl font-poppins">Make Admin</h2>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="Name"
                  type="text"
                  className="input input-bordered  rounded-lg focus:outline-none"
                  defaultValue={user.name}
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
                  defaultValue={user.email}
                  readOnly
                />
              </div>

              {user.role === "user" ? <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="Role"
                  type="text"
                  defaultValue={defaultRole}
                //   value={defaultRole}
                  className="input input-bordered  rounded-lg focus:outline-none outline-none px-2"
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
              </div>
              :
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <input
                  name="Role"
                  type="text"
                  defaultValue={defaultRole}
                    readOnly
                  className="input input-bordered  rounded-lg focus:outline-none outline-none"
                />
              </div>
              }

              <div className="modal-action">
                {user.role === "user" && 
                    <button className="btn1 border-base-content w-24"
                    >Submit</button>}
                <form method="dialog">
                <button className="btn1 border-base-content w-24"
                onClick={handleClose}>Close</button>
              </form>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default AdminModal;

