/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import useDonations from "../../../../../../custom/useDonations";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "../../../../../../context/AuthContext";
import MyDonatedModal from "./MyDonatedModal";

const MyDonated = () => {
  const { donations, refetch } = useDonations();
  const { user } = useContext(AuthProvider);

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  const userDonations = donations.filter(each => each?.userDonations.find(each => each?.donorEmail === user?.email)?.donorEmail === user?.email)

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
        My Donations
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
                <th className="font-poppins"></th>
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
                  <td>
                    <MyDonatedModal id={each?._id}></MyDonatedModal>
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
