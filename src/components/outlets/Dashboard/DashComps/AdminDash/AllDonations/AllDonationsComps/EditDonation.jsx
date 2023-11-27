import { useParams } from "react-router-dom"
import useDonations from "../../../../../../../custom/useDonations";
import { Formik, Field, Form } from 'formik';

const EditDonation = () => {
    const params = useParams()
    const { donations } = useDonations()

    const each = donations.find(donation => donation._id === params.id)

    return (
        <div className="min-h-screen bg-orange-50">
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
                         {/* <DonationModal
                           donationId={each?._id}
                           donatedAmount={each?.donated}
                         ></DonationModal> */}
                       </div>
                     </div>
                   </div>
                 </>
            }
        </div>
    );
};

export default EditDonation;

/**
 
        {
      "category": "dogs",
      "name": "Hazel",
      "shortDescription": "Playful pup longing for love!",
      "longDescription": "Hazel, the playful pup, is longing for a caring family to share her joy and playfulness. Your contribution can make a significant difference in Hazel's journey towards a brighter and happier future. Join us in supporting Hazel's dream of finding a family to call her own.",
      "image": "https://res-console.cloudinary.com/diyh5df1v/media_explorer_thumbnails/57d0a9915d78689c8305039937a0a948/detailed",
      "maxDonation": 400,
      "donated": 150,
      "lastDate": "2023-11-26T14:00:00Z",
      "addedDate": "2023-11-11T11:55:00Z",
      "userDonations": [
        {
          "donorName": "Grace",
          "donationAmount": 80,
          "donationDate": "2023-11-24T12:30:00Z"
        },
        {
          "donorName": "Harry",
          "donationAmount": 70,
          "donationDate": "2023-11-28T17:45:00Z"
        }
      ],
      "donationPaused": false
    }
 */