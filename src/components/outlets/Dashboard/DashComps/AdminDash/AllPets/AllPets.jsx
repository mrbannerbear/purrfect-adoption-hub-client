/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import usePets from "../../../../../../custom/usePets";
import PetAdopt from "./AllPetsComps/PetAdopt";
import PetDelete from "./AllPetsComps/PetDelete";
import { NavLink } from "react-router-dom";

const AllPets = () => {
  const { pets } = usePets();

  console.log(pets);

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
        All Pets
      </h1>
      <div className="w-[90%] mx-auto border-2">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="font-poppins"></th>
                <th className="font-poppins">Name</th>
                <th className="font-poppins">Image</th>
                <th className="font-poppins">Adopted</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pets.map((each, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    <img src={each?.image} className="w-16 h-12" alt="" />
                  </td>
                  <td className="flex gap-1">
                    { each?.adopted == "false" ? "false" : each?.adopted ? "true" : "false"}{" "}
                    <PetAdopt id={each._id}></PetAdopt>
                  </td>
                  <td>
                    <PetDelete id={each._id}></PetDelete>
                  </td>
                  <td>
                    <NavLink to={`/dashboard/pet-update/${each._id}`}>
                      <button className="btn1">Update</button>
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

export default AllPets;
