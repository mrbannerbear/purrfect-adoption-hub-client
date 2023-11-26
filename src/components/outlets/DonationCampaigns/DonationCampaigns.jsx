import useDonations from "../../../custom/useDonations";
import { NavLink } from "react-router-dom";

const DonationCampaigns = () => {
  const { donations, isLoading, error } = useDonations();

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

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-12 md:px-0">
      <h1 className="text-center text-3xl font-medium mb-6">
        Donation Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-10 justify-items-center">
        {donations.map((each) => (
          <div
            key={each?._id}
            className="card w-96 bg-base-100 shadow-xl relative"
          >
            <figure className="px-6 pt-5">
              <img
                src={each?.image}
                alt={each.name + " ," + each.category}
                className="rounded-xl w-full h-56"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl font-medium">{each?.name}</h2>
              <progress
                className="progress w-56 mt-4"
                value={each.donated}
                max={each.maxDonation}
              ></progress>
              <p className="text-xs text-gray-600 text-center">${each.donated} of ${each.maxDonation} donated</p>
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
        ))}
      </div>
    </div>
  );
};

export default DonationCampaigns;
