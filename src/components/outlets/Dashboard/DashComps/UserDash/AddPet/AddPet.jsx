import { Toaster } from "react-hot-toast";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useState } from "react";

const AddPet = () => {

    const [imageValue, setImageValue] = useState("")
    const [imageName, setImageName] = useState("")

    const HandleImage = (e) => {
        e.preventDefault()
  
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        reader.onloadend = () => {
            setImageValue(reader.result)
            setImageName(e.target.files[0].name)
        }
      
    }

  const HandleAdd = (values) => {
    console.log(imageValue);
    axios.post("http://localhost:4200/cloudinary", { image: imageValue, imageName: imageName })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
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
                  </div>
                </div>

                <div className="form-control" 
                >
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
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn1">
                    Add Pet
                  </button>
                </div>
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
