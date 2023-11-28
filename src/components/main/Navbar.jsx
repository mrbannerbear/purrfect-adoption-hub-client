import { NavLink } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useContext(AuthProvider);

  const NavComps = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Pet Listings",
      path: "/pet-listings",
    },
    {
      id: 3,
      name: "Donation Campaigns",
      path: "/donation-campaigns",
    },
    {
      id: 4,
      name: "Contact",
      path: "/contact",
    },
  ];

  const HandleLogout = () => {
    logout()
    .then(res => {
      axios.post("http://localhost:4200/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
    })
    .catch()
  }

  return (
    <nav className="lg:px-12">
      <div className="navbar md:py-3">
        <div className="navbar-start flex-1">
          <NavLink to="/">
            <span className="px-4 text-3xl font-semibold text-orange-600">
              purr<span className="text-gray-600">fect </span>
              <span className="font-normal text-xs md:text-sm"> Adoption Hub</span>
            </span>
          </NavLink>
        </div>
        <div className="justify-end">
          {user ? (
            <div className="dropdown dropdown-left">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <img src={user?.photoURL} alt="" className="h-10 w-10 rounded-full"/>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content dropdown-bottom
      mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
              >
                <NavLink to="/dashboard">
                  <li>Dashboard</li>
                </NavLink>
                <NavLink>
                  <li><button className="hover:bg-transparent p-0"
                  onClick={HandleLogout}>Log Out</button></li>
                </NavLink>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn1">Login</button>
            </NavLink>
          )}
        </div>
      </div>
      <div className="px-6 mb-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 list-none justify-center navlink-container">

            {NavComps.map((each) => (
              <li key={each.id} className="text-sm md:text-[16px] p-1 md:px-2">
              <NavLink
                className={({ isPending, isActive }) =>
                  isPending ? "" : isActive ? "text-orange-600" : ""
                }
                to={each.path}
              >
                {each.name}

              </NavLink>
              </li>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
