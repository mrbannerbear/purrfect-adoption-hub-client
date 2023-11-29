/* eslint-disable react/prop-types */
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const GetImage = ({public_id}) => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'diyh5df1v'
        }
      });

      const myImage = cld.image(public_id);
      console.log("Cloudinary URL:", myImage.toURL());

    return (
        <>
             <AdvancedImage cldImg={myImage} />
        </>
    );
};

export default GetImage;