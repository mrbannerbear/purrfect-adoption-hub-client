import { FaLocationPin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {

    const locations = [
        {
          id: 1,
          city: "New York",
          state: "New York",
          street: "Broadway",
          shopNumber: "123",
          phone: "+1 555-123-4567",
        },
        {
          id: 2,
          city: "San Francisco",
          state: "California",
          street: "Lombard Street",
          shopNumber: "456",
          phone: "+1 555-987-6543",
        },
        {
          id: 3,
          city: "Austin",
          state: "Texas",
          street: "South Congress Avenue",
          shopNumber: "789",
          phone: "+1 555-555-5555",
        },
        {
          id: 4,
          city: "Denver",
          state: "Colorado",
          street: "16th Street Mall",
          shopNumber: "101",
          phone: "+1 555-777-8888",
        },
        {
          id: 5,
          city: "Miami",
          state: "Florida",
          street: "Ocean Drive",
          shopNumber: "202",
          phone: "+1 555-444-3333",
        },
      ];
      
      

  return (
    <div className="px-12 lg:px-24 lg:pb-20 my-12">
    <h1 className="text-center font-semibold text-4xl">Find <span className="text-orange-600">Us</span> At</h1>
    {/* <p className="text-center font-poppins mt-2 mb-5 text-gray-600">And Why We Do What We Do</p> */}
      <div className="hero min-h-[60vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://res-console.cloudinary.com/diyh5df1v/media_explorer_thumbnails/c0e60f7b1d10164ca8645e38a63ff70a/detailed"
            className="w-56 md:w-72 lg:w-96 rounded-lg"
          />
          <div>
          {locations.map(each => (
            <div key={each.id} className="border-b-[1.5px] py-3">
            <p className="flex items-center gap-1 text-sm md:text-base justify-start">
            <FaLocationPin className="text-orange-600" /> {each.shopNumber}, {each.street}, {each.city}, {each.state}
            </p>
            <p className="flex items-center gap-1 text-sm md:text-base pt-2 justify-start">
            <FaPhoneAlt /> {each.phone}
            </p>
          </div>)
          )
          }
               </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
