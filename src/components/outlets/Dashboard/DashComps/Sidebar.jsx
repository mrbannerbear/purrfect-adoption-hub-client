import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthProvider } from "../../../../context/AuthContext";


const Sidebar = () => {

    const { user, logout } = useContext(AuthProvider)

  const secureLinks = [
    {
      id: 1,
      path: "/admin/authorized-users",
      name: "Authorized Users",
    },
    {
      id: 2,
      path: "/admin/messages",
      name: "Messages",
    },
    {
      id: 3,
      path: "/admin/edit-menu",
      name: "Edit Menu",
    },
  ];

  const HandleLogOut = () => {
    logout()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div className="drawer lg:drawer-open min-h-full bg-orange-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="smooth-underline drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-olive-50 text-base-content">
          {/* Sidebar content here */}
          {secureLinks.map((each) => (
            <NavLink
              key={each.id}
              to={each.path}
              className={({ isPending, isActive }) =>
                isPending
                  ? ""
                  : isActive
                  ? "border-b-[1px] border-[#607244] my-2 text-olive-600 w-1/2"
                  : "smooth-underline my-2 w-1/2" 
              }
            >
              <li>{each.name}</li>
            </NavLink>
          ))}
          <div className="divider"></div>
          <NavLink to="/" className="smooth-underline w-1/2"><li>Home</li></NavLink>
          <li><button className="smooth-underline px-0 hover:bg-transparent w-1/2"
          onClick={HandleLogOut}>
            Log Out</button>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
