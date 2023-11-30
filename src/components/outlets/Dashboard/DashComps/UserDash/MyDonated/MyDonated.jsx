/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { MdEdit } from "react-icons/md";
import useDonations from "../../../../../../custom/useDonations";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "../../../../../../context/AuthContext";
import PauseModal from "../../AdminDash/AllDonations/AllDonationsComps/PauseModal";
import DonatorsModal from "../MyDonations/DonatorsModal";

const MyDonated = () => {
  const { donations, refetch } = useDonations();
  const { user } = useContext(AuthProvider);

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  const userDonations = donations.filter(each => each?.userDonations.find(each => each?.donorEmail === user?.email).donorEmail === user?.email)

  console.log(userDonations)

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
        All Donations
      </h1>
      <div className="w-[90%] mx-auto border-2">
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="font-poppins"></th>
                <th className="font-poppins">Name</th>
                <th className="font-poppins">Image</th>
                <th className="font-poppins">Donated</th>
                <th className="font-poppins"></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {userDonations.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    <img src={each?.image} className="w-12 h-8" alt="" />
                  </td>
                  <td>${each?.maxDonation}</td>
                  <td>
                   
                  </td>
                  <td className="flex gap-1 items-center">
                
                  </td>
                  <td>
                    <NavLink to={`/dashboard/edit-donation/${each?._id}`}>
                      <button className="btn1">Edit</button>
                    </NavLink>
                  </td>
                  <td>
                    <DonatorsModal id={each?._id}></DonatorsModal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDonated;
