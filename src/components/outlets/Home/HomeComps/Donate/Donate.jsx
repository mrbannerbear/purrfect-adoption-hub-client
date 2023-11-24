import { NavLink } from "react-router-dom";

const Donate = () => {
  return (
    <div className="px-12 lg:px-24 pb-12 lg:pb-20 lg:mt-12">
      <div
        className="hero min-h-[70vh] rounded-lg justify-end bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1583786083770-f5fa8e06524a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-content text-right text-white">
          <div className="max-w-md py-16 hidden md:block">
            <h1 className="mb-5 text-5xl font-medium text-white">
              You Can <span className="text-orange-600">Donate</span>
            </h1>
            <p className="text-sm lg:text-base mb-5 text-white font-poppins">
              Contribute To a Cause. <br /> Help the Animals in Need.
            </p>
            <NavLink to="/donation-campaigns">
              <button className="btn1">Donate Now</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow relative -top-16 hidden md:flex max-w-lg">
        <div className="stat">
          <div className="stat-title">In the US in 2022,</div>
          <div className="stat-value font-poppins">6.3M</div>
          <div className="stat-desc">Animals Entered <br /> Shelters</div>
        </div>

        <div className="stat">
          <div className="stat-title">In the same year,</div>
          <div className="stat-value font-poppins">3.2M</div>
          <div className="stat-desc">Were Adopted</div>
        </div>

        <div className="stat">
          <div className="stat-title">More Than</div>
          <div className="stat-value font-poppins">50%</div>
          <div className="stat-desc">Remained</div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-5 md:hidden">

      <div className="stats stats-vertical md:stats-horizontal shadow relative -top-16 md:-top-12 w-full">
        <div className="stat p-3">
          <div className="stat-title">In the US in 2022,</div>
          <div className="stat-value font-poppins">6.3M</div>
          <div className="stat-desc">Animals Entered <br /> Shelters</div>
        </div>

        <div className="stat p-3">
          <div className="stat-title">In the same year,</div>
          <div className="stat-value font-poppins">3.2M</div>
          <div className="stat-desc">Were Adopted</div>
        </div>

        <div className="stat p-3">
          <div className="stat-title">More Than</div>
          <div className="stat-value font-poppins">50%</div>
          <div className="stat-desc">Remained</div>
        </div>
      </div>

      <div className="max-w-sm py-16">
            <h1 className="mb-5 text-5xl font-medium text-gray-600">
              You Can <span className="text-orange-600">Donate</span>
            </h1>
            <p className="text-sm lg:text-base mb-5 text-gray-600 font-poppins">
              Contribute To a Cause. <br /> Help the Animals in Need.
            </p>
            <NavLink to="/donation-campaigns">
              <button className="btn1">Donate Now</button>
            </NavLink>
          </div>

      </div>
    </div>
  );
};

export default Donate;
