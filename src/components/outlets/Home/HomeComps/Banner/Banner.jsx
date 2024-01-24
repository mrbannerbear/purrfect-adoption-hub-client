/* eslint-disable react/no-unescaped-entities */
const Banner = () => {
    return (
        <div className="bg-orange-50 min-h-screen lg:min-h-[85vh] flex flex-col-reverse md:flex-row justify-center items-center">
              <div className="bg-contain bg-center">
            <img className="w-[16rem] md:w-[20rem] lg:w-[18rem]"
            src="/banner1.png" alt="" />
            </div>
            <div className="flex justify-center items-center text-center md:text-start">
                <div className="max-w-md">
                <h1 className="title-responsive font-semibold"><span className="text-orange-600">Love</span> Rescued, <br /> 
                <span className="text-orange-600 ml-3">Lives</span> Transformed</h1>
                <p className="pl-8 mt-4 font-poppins max-w-md text-sm text-gray-600">
                "Celebrating our furry little friends that bring laughter, warmth, & lots of love into our lives."
                </p>
                </div>
            </div>
           
        </div>
    );
};

export default Banner;

// https://res-console.cloudinary.com/diyh5df1v/media_explorer_thumbnails/637e43e01b05186fddc277fd24caae97/detailed