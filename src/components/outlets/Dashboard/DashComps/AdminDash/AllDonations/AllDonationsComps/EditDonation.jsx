import { Toaster, toast } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useParams } from "react-router-dom";
import useDonations from "../../../../../../../custom/useDonations";
import { AuthProvider } from "../../../../../../../context/AuthContext";

const EditDonation = () => {
  const params = useParams();
  const { donations } = useDonations();

  const [imageValue, setImageValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [uploadedPublicID, setUploadedPublicID] = useState(null);
  const { user } = useContext(AuthProvider);

  const HandleImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setImageValue(reader.result);
      setImageName(e.target.files[0].name.slice(0, -4));
      console.log(imageValue);
    };
  };

  const date = new Date();

  const each = donations.find((donation) => donation._id === params.id);

  const HandleEdit = (values) => {
    values.imageName =
      !imageName || imageName === "" ? each?.imageName : imageName;
      values.addedDate = date.toISOString();
      // values.userName = user?.displayName;
      // values.userEmail = user?.email;
      values.lastDate = new Date(values.lastDate).toISOString()
      values.donationPaused = false;
      values.donated = each?.donated

    console.log(values);
    if (imageName === "" || imageName == each?.imageName) {
      axios
        .patch(`http://localhost:4200/donations/${each?._id}`, values, {withCredentials: true})
        .then((res) => {
          res.data.modifiedCount > 0 && toast("Donation updated successfully");
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:4200/cloudinary", {
          image: imageValue,
          imageName: imageName,
        })
        .then((res) => {
          console.log(res);
          setUploadedPublicID(res.data.public_id);
          values.image = res.data.imgURL;
          axios
            .patch(`http://localhost:4200/donations/${each?._id}`, values, {withCredentials: true})
            .then((res) => {
              res.data.modifiedCount > 0 && toast("Donation updated successfully");
            })
            .catch((err) => console.log(err));
          console.log(values);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      {
        <>
          <div key={each?._id} className="relative">
            <h1 className="text-3xl text-center">Edit Donation</h1>
            <figure className="p-6">
              <img
                src={each?.image}
                alt={each?.name + " ," + each?.category}
                className="rounded-xl w-1/2 mx-auto"
              />
            </figure>

            <div className="hero">
              <div className=" card w-3/4 flex-col lg:flex-row-reverse">
                <div className="card-body px-4 flex-shrink-0 w-3/4 mx-auto bg-base-100 rounded-lg border-2 border-orange-600">
                  <Formik
                    initialValues={{
                      name: each?.name,
                      location: each?.location,
                      shortDescription: each?.shortDescription,
                      longDescription: each?.longDescription,
                      lastDate: each?.lastDate,
                      maxDonation: each?.maxDonation,
                      image: each?.image,
                      userDonations: each?.userDonations
                    }}
                    onSubmit={HandleEdit}
                  >
                    <Form>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Pet Name</span>
                        </label>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Pet Name"
                          className="input input-bordered  rounded-lg focus:outline-none"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Image</span>
                        </label>
                        <input
                          onChange={HandleImage}
                          name="image"
                          type="file"
                          placeholder="Image URL"
                          className="rounded-lg focus:outline-none outline-none"
                          
                        />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Donation Amount 
                          </span>
                        </label>
                        <Field
                          name="maxDonation"
                          type="number"
                          placeholder=""
                          className="input input-bordered  rounded-lg focus:outline-none"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Last Date of Donation
                          </span>
                        </label>
                        <Field
                          name="lastDate"
                          type="date"
                          placeholder="Maximum Donation Amount"
                          className="input input-bordered  rounded-lg focus:outline-none"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Location</span>
                        </label>
                        <Field
                          name="location"
                          type="text"
                          placeholder="location"
                          className="input input-bordered  rounded-lg focus:outline-none"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Short Description</span>
                        </label>
                        <Field
                          name="shortDescription"
                          type="text"
                          placeholder="Short Description"
                          className="input input-bordered  rounded-lg focus:outline-none"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Long Description</span>
                        </label>
                        <Field
                          as="textarea"
                          name="longDescription"
                          placeholder="Long Description"
                          className="input input-bordered  rounded-lg focus:outline-none h-28"
                          
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="form-control mt-6 w-full">
                        <button type="submit" className="btn1">
                          Submit
                        </button>
                      </div>
                      {/* { uploadedPublicID &&  <GetImage public_id={uploadedPublicID}/>} */}
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
            <Toaster />
          </div>
        </>
      }
    </div>
  );
};

export default EditDonation;

// { uploadedPublicID &&  <GetImage public_id={uploadedPublicID}/>}
