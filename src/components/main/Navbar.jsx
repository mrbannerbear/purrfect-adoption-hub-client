import { NavLink } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(AuthProvider);

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

  return (
    <nav className="lg:px-12">
      <div className="navbar md:py-3">
        <div className="navbar-start">
          <NavLink to="/">
            <span className="px-4 text-3xl font-semibold text-orange-600">
              purr<span className="text-gray-600">fect </span>
              <span className="font-normal text-sm"> Adoption Hub</span>
            </span>
          </NavLink>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-left">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content dropdown-bottom
      mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
              >
                <NavLink>
                  <li>Dashboard</li>
                </NavLink>
                <NavLink>
                  <li>Log Out</li>
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
          <div className="flex space-x-4 list-none justify-center">
            {NavComps.map((each) => (
              <NavLink
                className={({ isPending, isActive }) =>
                  isPending ? "" : isActive ? "text-orange-600" : ""
                }
                key={each.id}
                to={each.path}
              >
                <li className="text-sm md:text-[16px] p-1 md:px-2">
                  {each.name}
                </li>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
