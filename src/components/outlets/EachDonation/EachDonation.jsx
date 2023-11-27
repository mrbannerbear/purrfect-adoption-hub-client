import useDonations from "../../../custom/useDonations";
import { useParams, NavLink } from "react-router-dom";
import DonationModal from "./EachDonationComps/DonationModal";

const EachDonation = () => {
  const { donations } = useDonations();
  const params = useParams();

  const each = donations.find((each) => each?._id === params.id);

  return (
    <>
      <div className="min-h-screen bg-orange-50 py-12 flex justify-center items-center">
        {
          <>
            <div key={each?._id} className="relative">
              <figure className="px-6 pt-5">
                <img
                  src={each?.image}
                  alt={each?.name + " ," + each?.category}
                  className="rounded-xl w-1/2 mx-auto"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl font-medium">
                  {each?.name}
                </h2>
                <p className="max-w-lg text-[13.5px] text-gray-600">
                  {each?.longDescription}
                </p>
                <p className="text-gray-600">{each?.location}</p>
                <progress
                  className="progress w-56 mt-4"
                  value={each?.donated}
                  max={each?.maxDonation}
                ></progress>
                <p className="text-xs text-gray-600 text-center">
                  ${each?.donated} of ${each?.maxDonation} donated
                </p>
                <div className="card-actions absolute -bottom-5 w-full mx-auto flex justify-center">
                  <DonationModal
                    donationId={each?._id}
                    donatedAmount={each?.donated}
                  ></DonationModal>
                </div>
              </div>
            </div>
          </>
        }
      </div>

        <p>
            <h2 className="text-center font-medium text-xl pt-12 pb-4 bg-orange-50">You May Also Donate For</h2>
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-10 justify-items-center pb-16 lg:pb-32 bg-orange-50">
        {donations
        .slice(0, 4)
          .filter((card) => card._id !== each._id && !card?.donationPaused )
          .map((each) => (
            <div
              key={each?._id}
              className="card w-72 bg-base-100 shadow-xl relative"
            >
              <figure className="px-6 pt-5">
                <img
                  src={each?.image}
                  alt={each.name + " ," + each.category}
                  className="rounded-xl w-full h-44"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl font-medium">
                  {each?.name}
                </h2>
                <p className="text-xs text-gray-600 text-center">
                  {each?.shortDescription}
                </p>
                <progress
                  className="progress w-56 mt-4"
                  value={each.donated}
                  max={each.maxDonation}
                ></progress>
                <p className="text-xs text-gray-600 text-center">
                  ${each.donated} of ${each.maxDonation} donated
                </p>
                <div className="card-actions absolute -bottom-5 w-full">
                  <NavLink
                    to={`/donations/${each._id}`}
                    className="w-3/4 mx-auto"
                  >
                    <button className="btn1 w-full">Details</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EachDonation;
