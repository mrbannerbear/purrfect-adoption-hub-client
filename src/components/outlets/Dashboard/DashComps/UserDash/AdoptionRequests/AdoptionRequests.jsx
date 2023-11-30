/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext } from "react";
import { AuthProvider } from "../../../../../../context/AuthContext";
import AdoptionReqModal from "./AdoptionReqComps/AdoptionReqModal";
import useAdoptionRequests from "../../../../../../custom/useAdoptionRequests";
import usePets from "../../../../../../custom/usePets";

const AdoptionRequests = () => {
  const { requests } = useAdoptionRequests()
  const { pets } = usePets()
  const { user } = useContext(AuthProvider);

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

    const myRequests = requests.filter(each => each?.adderEmail === user?.email)
    const reqPets = pets.filter(each => myRequests.some(obj => obj.petID === each._id))

    console.log(reqPets)

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
       Adoption Requests
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
                <th className="font-poppins">Adoption Requests</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {reqPets.map((each, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    <img src={each?.image} className="w-12 h-8" alt="" />
                  </td>
                  <td>
                    <AdoptionReqModal id={each?._id}></AdoptionReqModal>
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

export default AdoptionRequests;