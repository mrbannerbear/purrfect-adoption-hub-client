import usePets from "../../../custom/usePets";
import { useParams } from "react-router-dom"
import Modal from "./EachPetComps/Modal";

const EachPet = () => {
  const { pets } = usePets();
  const params = useParams()

  const each = pets.find(each => each._id === params.id)
  return  (
  <div className="min-h-screen bg-orange-50 py-12 flex justify-center items-center">
    {
         
                  <div
                    key={each?._id}
                    className="card w-96 bg-base-100 shadow-xl relative"
                  >
                    <figure className="px-6 pt-5">
                      <img
                        src={each?.image}
                        alt={each?.name + " ," + each?.category}
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title text-3xl font-medium">
                        {each?.name}
                      </h2>
                      <p className="-mt-2 text-gray-600">Age: {each?.age}</p>
                      <p className="text-gray-600">{each?.location}</p>
                      <div className="card-actions absolute -bottom-5 w-full mx-auto flex justify-center">
                      <Modal id={each?._id}></Modal>
                      </div>
                    </div>
                  </div>
           
    }

  </div>)
};

export default EachPet;
