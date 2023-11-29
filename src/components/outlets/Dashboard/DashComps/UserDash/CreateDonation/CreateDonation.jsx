import { Toaster, toast } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import GetImage from "../../../../../../cloudinary/GetImage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { AuthProvider } from "../../../../../../context/AuthContext";

const CreateDonation = () => {
  const [imageValue, setImageValue] = useState("");
  const [imageName, setImageName] = useState("");
  const { user } = useContext(AuthProvider);

  const HandleImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setImageValue(reader.result);
      setImageName(e.target.files[0].name.slice(0, -4));
      // console.log(imageName)
    };
  };

  const date = new Date()

  const HandleAdd = (values) => {

    values.imageName = imageName;
    values.addedDate = date.toISOString();
    values.userName = user?.displayName;
    values.userEmail = user?.email;
    values.donated = 0
    values.userDonations = [];
    values.lastDate = new Date(values.lastDate).toISOString()
    values.donationPaused = false;

    console.log(values)

    axios
      .post("http://localhost:4200/cloudinary", {
        image: imageValue,
        imageName: imageName,
      })
      .then((res) => {
        console.log(res);
        values.image = res.data.imgURL;

        axios
          .post("http://localhost:4200/donations",  values )
          .then((res) => {
            toast("Pet added successfully");
          })
          .catch((err) => console.log(err));
        console.log(values);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <h1 className="text-3xl text-center pb-4">Create Donation</h1>
      <div className="hero">
        <div className=" card w-3/4 flex-col lg:flex-row-reverse">
          <div className="card-body px-4 flex-shrink-0 w-3/4 mx-auto bg-base-100 rounded-lg border-2 border-orange-600">
            <Formik
              initialValues={{
                name: "",
                location: "",
                shortDescription: "",
                longDescription: "",
                lastDate: null,
                maxDonation: null,
                image: null,
              }}
              onSubmit={HandleAdd}
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
                      required
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
                    required
                  />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Donation Amount Required</span>
                    </label>
                    <Field
                      name="maxDonation"
                      type="number"
                      placeholder="Maximum Donation Amount"
                      className="input input-bordered  rounded-lg focus:outline-none"
                      required
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Last Date of Donation</span>
                    </label>
                    <Field
                      name="lastDate"
                      type="date"
                      placeholder=""
                      className="input input-bordered  rounded-lg focus:outline-none"
                      required
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
                    required
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
                    required
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
                    required
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
  )
};

export default CreateDonation;
