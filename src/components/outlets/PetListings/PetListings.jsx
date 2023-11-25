import usePets from "../../../custom/usePets";
import { useLocation, NavLink } from "react-router-dom";

const PetListings = () => {
  const { pets } = usePets();
  const location = useLocation();
  console.log(location);

  return (
    <div className="min-h-screen bg-orange-50 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-10 justify-items-center">
        {pets.map((each) => (
          <div
            key={each?._id}
            className="card w-96 bg-base-100 shadow-xl relative"
          >
            <figure className="px-6 pt-5">
              <img
                src={each?.image}
                alt={each.name + " ," + each.category}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl font-medium">{each?.name}</h2>
              <p className="-mt-2 text-gray-600">Age: {each?.age}</p>
              <p className="text-gray-600">{each?.location}</p>
              <div className="card-actions absolute -bottom-5 w-full">
              
                  <button className="btn1 w-3/4 mx-auto">
                  <NavLink>Details </NavLink>
                  </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListings;
