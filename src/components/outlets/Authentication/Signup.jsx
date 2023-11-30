import { useContext, useState } from "react";
import { AuthProvider } from "../../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import auth from "../../../../firebase/firebase.config";
import axios from "axios";

const Signup = () => {
  const { signup, googleAuth, facebookAuth } = useContext(AuthProvider);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const HandleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Your password must be at least six characters long.");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      setError(
        "Your password must contain an uppercase letter, a lowercase letter, and a special character"
      );
      return;
    }

    signup(email, password)
      .then((data) => {
        let user = data.user;
        const creationTime = user?.metadata?.creationTime;
        const lastSignInTime = user?.metadata?.lastSignInTime;
        console.log(data);
        setError(null);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        })
          .then((data) => {
            toast("Signed up successfully");
            console.log(data);
          })
          .catch((err) => console.log(err));
        axios
          .post("https://purrfect-server.vercel.app/users", {
            name: name,
            email: user?.email,
            image: image,
            creationTime: creationTime,
            lastSignInTime: lastSignInTime,
            role: "user",
          })
          .then(res => {
            axios
            .post("https://purrfect-server.vercel.app/jwt", {user: user.email}, { withCredentials: true })
            .then((res) => {
              toast("Registration successful");
              if (res.data.success) {
                window.location.href = "/"
                navigate(location?.state ? location?.state : "/");
              }
            })
  
            .catch((error) => {
              console.log(error);
            });
          })
          .catch();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const HandleGoogleAuth = () => {
    googleAuth()
      .then((data) => {
        let user = data.user;
        const creationTime = user?.metadata?.creationTime;
        const lastSignInTime = user?.metadata?.lastSignInTime;
        console.log(data.user);
        axios.post("https://purrfect-server.vercel.app/users", {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          creationTime: creationTime,
          lastSignInTime: lastSignInTime,
          role: "user",
        }).then(res => {
          axios
          .post("https://purrfect-server.vercel.app/jwt", {user: user.email}, { withCredentials: true })
          .then((res) => {
            toast("Registration successful");
            if (res.data.success) {
              window.location.href = "/"
              navigate(location?.state ? location?.state : "/");
            }
          })

          .catch((error) => {
            console.log(error);
          });
        }).catch();
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const HandleFacebookAuth = () => {
    facebookAuth()
      .then((data) => {
        let user = data.user;
        const creationTime = user?.metadata?.creationTime;
        const lastSignInTime = user?.metadata?.lastSignInTime;
        console.log(data);
        axios.post("https://purrfect-server.vercel.app/users", {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          creationTime: creationTime,
          lastSignInTime: lastSignInTime,
          role: "user",
        }).then(res => {
          axios
          .post("https://purrfect-server.vercel.app/jwt", {user: user.email}, { withCredentials: true })
          .then((res) => {
            toast("Registration successful");
            if (res.data.success) {
              window.location.href = "/"
              navigate(location?.state ? location?.state : "/");
            }
          })

          .catch((error) => {
            console.log(error);
          });
        }).catch();
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>PurrFect | Signup</title>
      </Helmet>
      <div className="w-full bg-orange-50">
        <h1 className="font-semibold text-4xl py-4 text-center">Sign Up</h1>
      </div>
      <div className="hero min-h-screen bg-orange-50">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card flex-shrink-0 lg:w-1/3 shadow-lg bg-base-100 rounded-lg">
            <div className="card-body rounded-lg">
              <p className="text-center text-sm">
                <p className="w-full justify-center flex flex-col">
                  <button
                    className="text-sm flex my-3 border-[1.5px] items-center justify-center gap-2 border-green-500/30
                    rounded-lg
              w-full
              py-2"
                    onClick={HandleGoogleAuth}
                  >
                    <FcGoogle></FcGoogle> Login with Google
                  </button>

                  <button
                    className="text-sm flex mb-3 border-[1.5px] items-center justify-center gap-2 border-blue-500/30
                    rounded-lg
              w-full
              py-2"
                    onClick={HandleFacebookAuth}
                  >
                    <FaFacebook></FaFacebook> Login with Facebook
                  </button>
                </p>
                <span className="my-5"> Or</span>
              </p>

              <form className="" onSubmit={HandleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="full name"
                    name="name"
                    className="input input-bordered rounded-lg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="image url"
                    name="image"
                    className="input input-bordered rounded-lg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered rounded-lg"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered rounded-lg"
                    required
                  />
                </div>
                <span className="text-red-500 my-3 text-xs text-center">
                  {error}
                </span>
                <div className="form-control mt-6">
                  <input className="btn1" type="submit" value="Sign Up" />
                </div>
              </form>
              <p className="text-xs text-center">
                Already have an account?{" "}
                <NavLink className="underline" to="/login">
                  Login
                </NavLink>{" "}
                here.
              </p>
            </div>
          </div>
        </div>
        <Toaster></Toaster>
      </div>
    </>
  );
};

export default Signup;
