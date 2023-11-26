/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext';
import useUsers from '../custom/useUsers';


const AdminRoutes = ({children}) => {

    const location = useLocation()
    const { user, loading } = useContext(AuthProvider)

    const { users } = useUsers()
    console.log(user)

    const uniqueUser = users.find(each => each.email === user.email)

  if(uniqueUser?.role === "admin"){
    return children
  }
  if(loading){
    return (
        <div className="min-h-screen bg-orange-50 flex justify-center items-center">
          <div>
            <h3 className="text-2xl font-bold">
            <span className="loading loading-dots loading-lg"></span>
            </h3>
          </div>
        </div>
      );
  }
  return <Navigate to="/dashboard" state={location.pathname}></Navigate>
};

export default AdminRoutes;