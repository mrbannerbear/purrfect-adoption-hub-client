/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { MdEdit } from "react-icons/md";
import useDonations from "../../../../../../custom/useDonations";
import PauseModal from "./AllDonationsComps/PauseModal";
import DeleteModal from "./AllDonationsComps/DeleteModal";
import { NavLink } from "react-router-dom"

const AllDonations = () => {
  const { donations } = useDonations();

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  console.log(donations);

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
                <th className="font-poppins">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {donations.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    <img src={each?.image} className="w-12 h-8" alt="" />
                  </td>
                  <td className="flex gap-1 items-center">
                    {each?.donationPaused ? <>Paused</> : <>Ongoing</>}
                    <PauseModal
                      paused={each?.donationPaused}
                      id={each?._id}
                    ></PauseModal>
                  </td>
                  <td>
                    <DeleteModal
                      id={each?._id}
                    ></DeleteModal>
                  </td>
                  <td>
                    <NavLink to={`/edit-donation/${each?._id}`}>
                        <button className="btn1">
                            Edit
                        </button>
                    </NavLink>
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

export default AllDonations;
