/* eslint-disable react/no-unescaped-entities */
const Banner = () => {
    return (
        <div className="bg-orange-50 min-h-screen lg:min-h-[85vh] flex flex-col-reverse md:flex-row justify-center items-center">
              <div className="">
            <img className="w-[16rem] md:w-[20rem] lg:w-[18rem]"
            src="https://res-console.cloudinary.com/diyh5df1v/media_explorer_thumbnails/fcfd0f2e7915ef64b8e5a7f8f6d17190/detailed" alt="" />
            </div>
            <div className="flex justify-center items-center text-center md:text-start">
                <div className="max-w-md">
                <h1 className="title-responsive font-semibold"><span className="text-orange-600">Love</span> Rescued, <br /> 
                <span className="text-orange-600 ml-3">Lives</span> Transformed</h1>
                <p className="pl-8 mt-4">
                "Welcome to Purrfect, where tails wag and whiskers<br />
                <span className="md:ml-2"></span>enchant. Our furry little friends bring laughter, warmth, <br />
                <span className="md:ml-4"></span> a unique kind of happiness & lots of love into our lives."
                </p>
                </div>
            </div>
           
        </div>
    );
};

export default Banner;

// https://res-console.cloudinary.com/diyh5df1v/media_explorer_thumbnails/637e43e01b05186fddc277fd24caae97/detailed