import useDonations from "../../../custom/useDonations";
import { useParams } from "react-router-dom";
import DonationModal from "./EachDonationComps/DonationModal";

const EachDonation = () => {
  const { donations } = useDonations();
  const params = useParams();

  const each = donations.find((each) => each?._id === params.id);

  return (
    <div className="min-h-screen bg-orange-50 py-12 flex justify-center items-center">
      {
        <div key={each?._id} className="relative">
          <figure className="px-6 pt-5">
            <img
              src={each?.image}
              alt={each?.name + " ," + each?.category}
              className="rounded-xl w-1/2 mx-auto"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl font-medium">{each?.name}</h2>
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
              <DonationModal></DonationModal>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EachDonation;
