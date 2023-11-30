import { Toaster, toast } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useParams } from "react-router-dom"
import { AuthProvider } from "../../../../../../../context/AuthContext";
import usePets from "../../../../../../../custom/usePets";


const PetUpdate = () => {
  const [imageValue, setImageValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [uploadedPublicID, setUploadedPublicID] = useState(null);
  const { user } = useContext(AuthProvider);
  const { pets } = usePets()
  const params = useParams()

  const each = pets.find(pet => pet._id === params.id)

  const HandleImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setImageValue(reader.result);
      setImageName(e.target.files[0].name.slice(0, -4));
      console.log(imageValue)
    };
  };

  const options = ["cats", "dogs", "rabbits", "fish"];
  const defaultOption = each?.category;

  const HandleDropdown = (e) => {
    setCategoryFilter(e.value);
  };

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  const HandleUpdate = (values) => {

    values.imageName = !imageName || imageName === "" ? each?.imageName : imageName;
    values.category = categoryFilter === "" ? each?.category : categoryFilter.toLowerCase();
    values.added_dateShort = `${year}-${month}-${day}`;
    values.added_date = date.toISOString();
    values.userName = user?.displayName;
    values.userEmail = user?.email;

    console.log(values)
    if(imageName === "" || imageName == each?.imageName){
        axios
        .patch(`https://purrfect-server.vercel.app/all-pets/${each?._id}`, values, {withCredentials: true})
        .then((res) => {
            res.data.modifiedCount > 0 && toast("Pet updated successfully");
          console.log(res.data)
        })
        .catch((err) => console.log(err));
    }
    else{axios
      .post("https://purrfect-server.vercel.app/cloudinary", {
        image: imageValue,
        imageName: imageName,
      }, {withCredentials: true})
      .then((res) => {
        console.log(res);
        setUploadedPublicID(res.data.public_id);
        values.image = res.data.imgURL;
        axios
          .patch(`https://purrfect-server.vercel.app/all-pets/${each?._id}`, values)
          .then((res) => {
            res.data.modifiedCount > 0 && toast("Pet updated successfully");
          })
          .catch((err) => console.log(err));
        console.log(values);
      })
      .catch((err) => console.log(err));}
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <h1 className="text-3xl text-center pb-4">Update Pet</h1>
      <div className="hero">
        <div className=" card w-3/4 flex-col lg:flex-row-reverse">
          <div className="card-body px-4 flex-shrink-0 w-full bg-base-100 rounded-lg border-2 border-orange-600">
            <Formik
              initialValues={{
                name: each?.name,
                age: each?.age,
                location: each?.location,
                shortDescription: each?.shortDescription,
                longDescription: each?.longDescription,
                image: each?.image,
                imageName: each?.imageName,
                adopted: each?.adopted,
                category: each?.category
              }}
              onSubmit={HandleUpdate}
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
                    
                  />
                  <p className="text-xs mt-3">Current Image: <a target="_blank">{each?.image}</a></p>

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
                    
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text text-base">Adoption Status</span>
                  </label>
                  <label>
                  <Field
                            name="adopted"
                            type="radio"
                            value="true"
                        /> True
                  </label>
                  <label>
                  <Field
                            name="adopted"
                            type="radio"
                            value="false"
                        /> False
                  </label>
                      
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn1">
                    Update Pet
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

export default PetUpdate;
