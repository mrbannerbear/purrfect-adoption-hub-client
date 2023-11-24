import { NavLink } from "react-router-dom"

const CallToAction = () => {
  return (
    <div className="px-12 lg:px-24 pb-12 lg:pb-20 lg:mt-12">
      <div
        className="hero min-h-[50vh] rounded-lg justify-end"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >

        <div className="hero-content text-right text-white">
          <div className="max-w-md py-16">
            <h1 className="mb-5 text-5xl font-medium text-white"><span className="text-orange-600">Adopt</span> a Friend</h1>
            <p className="mb-5 text-white font-poppins text-sm">
            Join us in giving these loving souls an equally loving home.
            </p>
            <NavLink to="/pet-listings">
            <button className="btn1">Adopt Now</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
