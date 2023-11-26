import usePets from "../../../custom/usePets";
import { useLocation, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const PetListings = () => {
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [uniquePet, setUniquePet] = useState(null)
  let location = useLocation();
  console.log(location)

  useEffect(() => {
    if(location.state){
    setCategoryFilter(location.state)}
  }, [location.state]);

  const { isLoading, pets, error } = usePets();

  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 py-12 flex justify-center items-center">
        <h2>An error occurred while fetching data.</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-50 py-12 flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const HandleSearch = (e) => {
    e.preventDefault();
    const name = e.target.search.value;

     if (pets.find((each) => each.name === name)) {
        setUniquePet(name)
    }
    else{
        setUniquePet(null)
    }
  };
  console.log(uniquePet)

  const options = ["All", "Cats", "Dogs", "Rabbits", "Fish"];
  const defaultOption = options[0]

  const HandleDropdown = (e) => {
        setCategoryFilter(e.value)
  }

  const filtered = categoryFilter !== "All" ? pets
  .filter((each) => (each.adopted === false &&
    categoryFilter !== "All" && categoryFilter.toLowerCase() === each.category)
    ): pets.filter(each => each.adopted === false)

    const uniqueFiltered = uniquePet ? pets.filter(each => each.name === uniquePet) : filtered

  return (
    <div className="min-h-screen bg-orange-50 py-12">
      <div className="w-full flex justify-center gap-5">
        <form className="join justify-center mb-6 " onSubmit={HandleSearch}>
          <input
            className="input input-bordered join-item focus:outline-none rounded-l-lg"
            name="search"
            placeholder="Search eg: 'Scooby'"
          />
          <button className="btn1 join-item text-white">
            <CiSearch></CiSearch>
          </button>
        </form>

        <div className="">
          {/*   <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />*/}
          <Dropdown
          className="rounded-lg"
            options={options}
            value={defaultOption}
            onChange={HandleDropdown}
            placeholder="Select an option"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-10 justify-items-center">
        {uniqueFiltered
          .map((each) => (
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
                <h2 className="card-title text-3xl font-medium">
                  {each?.name}
                </h2>
                <p className="-mt-2 text-gray-600">Age: {each?.age}</p>
                <p className="text-gray-600">{each?.location}</p>
                <div className="card-actions absolute -bottom-5 w-full">
                  <NavLink
                    to={`/pet-listings/${each._id}`}
                    className="w-3/4 mx-auto"
                  >
                    <button className="btn1 w-full">Details</button>
                  </NavLink>
                </div>
              </div>
            </div>
          )
          
          )}
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default PetListings;
