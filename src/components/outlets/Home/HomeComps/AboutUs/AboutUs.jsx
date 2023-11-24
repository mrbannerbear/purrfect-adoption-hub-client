const AboutUs = () => {

  return (
    <div className="px-12 lg:px-24 py-12 lg:pb-20 my-12 bg-orange-50">
        <h1 className="text-center font-semibold text-4xl">Who <span className="text-orange-600">We</span> Are</h1>
        <p className="text-center font-poppins mt-2 mb-12 text-gray-600">And Why We Do What We Do</p>
      <div className=" min-h-screen rounded-lg">
        <div className="hero-content flex-col gap-[2rem] md:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-56 lg:w-72 rounded-lg shadow-2xl"
          />
          <div>
          <h1 className="text-3xl font-medium">Our Mission</h1>
            <p className="py-6 font-poppins">
            At Purrfect, our mission is to connect hearts and paws, creating meaningful relationships between pets and their forever families. 
            We believe in the transformative power of adoption and aim to make the process as joyous as the companionship it brings
            </p>

          </div>
        </div>
        <div className="hero-content flex-col gap-[2rem] md:flex-row">
          <img
            src="https://images.unsplash.com/photo-1528301725143-1ba694832e77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-56 lg:w-72 rounded-lg shadow-2xl"
          />
          <div >
          <h1 className="text-3xl font-medium">How It Works:</h1>
            <p className="py-6 font-poppins">
            Explore our user-friendly platform designed to make pet adoption a breeze. 
            Browse through our listings, connect with pets in need, and embark on a journey of unconditional love. 
            Our step-by-step process ensures a seamless experience for both adopters and pets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
