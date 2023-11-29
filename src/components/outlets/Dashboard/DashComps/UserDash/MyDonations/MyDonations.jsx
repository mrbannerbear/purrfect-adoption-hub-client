/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { MdEdit } from "react-icons/md";
import useDonations from "../../../../../../custom/useDonations";
import DeleteModal from "../../AdminDash/AllDonations/AllDonationsComps/DeleteModal";
import PauseModal from "../../AdminDash/AllDonations/AllDonationsComps/PauseModal";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "../../../../../../context/AuthContext";
import DonatorsModal from "./DonatorsModal";

const MyDonations = () => {
  const { donations } = useDonations();
  const { user } = useContext(AuthProvider);

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  const myDonations = donations.filter(
    (each) => each?.userEmail === user?.email
  );

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
                <th className="font-poppins">Max Donation</th>
                <th className="font-poppins">Progress</th>
                <th className="font-poppins">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myDonations.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    <img src={each?.image} className="w-12 h-8" alt="" />
                  </td>
                  <td>${each?.maxDonation}</td>
                  <td>
                    <div
                      className="radial-progress"
                      style={{
                        "--value": `${(each?.donated / each?.maxDonation)*100}`,
                        "--size": "3rem",
                      }}
                      role="progressbar"
                    >
                      {Math.floor((each?.donated / each?.maxDonation).toFixed(2) * 100)}%
                    </div>
                  </td>
                  <td className="flex gap-1 items-center">
                    {each?.donationPaused ? <>Paused</> : <>Ongoing</>}
                    <PauseModal
                      paused={each?.donationPaused}
                      id={each?._id}
                    ></PauseModal>
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

export default MyDonations;
