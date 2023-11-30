import { Toaster, toast } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import GetImage from "../../../../../../cloudinary/GetImage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { AuthProvider } from "../../../../../../context/AuthContext";

const AddPet = () => {
  const [imageValue, setImageValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [uploadedPublicID, setUploadedPublicID] = useState(null);
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

  const options = ["Cats", "Dogs", "Rabbits", "Fish"];
  const defaultOption = options[0];

  const HandleDropdown = (e) => {
    setCategoryFilter(e.value);
  };

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  const HandleAdd = (values) => {
    console.log(imageName);

    axios
      .post("https://purrfect-server.vercel.app/cloudinary", {
        image: imageValue,
        imageName: imageName,
      })
      .then((res) => {
        console.log(res);
        setUploadedPublicID(res.data.public_id);
        values.imageName = imageName;
        values.image = res.data.imgURL;
        values.category = categoryFilter.toLowerCase();
        values.added_dateShort = `${year}-${month}-${day}`;
        values.added_date = date.toISOString();
        values.userName = user?.displayName;
        values.userEmail = user?.email;
        values.adopted = false;
        axios
          .post("https://purrfect-server.vercel.app/all-pets",  values, {withCredentials: true} )
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
      <h1 className="text-3xl text-center pb-4">Add a Pet</h1>
      <div className="hero">
        <div className=" card w-3/4 flex-col lg:flex-row-reverse">
          <div className="card-body px-4 flex-shrink-0 w-full bg-base-100 rounded-lg border-2 border-orange-600">
            <Formik
              initialValues={{
                name: "",
                age: "",
                location: "",
                shortDescription: "",
                longDescription: "",
                image: null,
              }}
              onSubmit={HandleAdd}
            >
              <Form>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="form-control w-3/4">
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

                  <div className="form-control w-28">
                    <label className="label">
                      <span className="label-text">Pet Age</span>
                    </label>
                    <Field
                      name="age"
                      type="number"
                      placeholder="Pet Age"
                      className="input input-bordered  rounded-lg focus:outline-none"
                      required
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="form-control">
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

                <div className="form-control">
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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <Dropdown
                    className="rounded-lg"
                    options={options}
                    value={defaultOption}
                    onChange={HandleDropdown}
                    placeholder="Select an option"
                  />
                </div>

                <div className="form-control">
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

                <div className="form-control">
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

                <div className="form-control mt-6">
                  <button type="submit" className="btn1">
                    Add Pet
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
  );
};

export default AddPet;
