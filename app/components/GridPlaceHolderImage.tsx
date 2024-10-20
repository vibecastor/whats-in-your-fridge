import openFridge from "../assets/open-fridge.png";
import Image from "next/image";

function GridPlaceHolderImage() {
  return (
    <div className="flex justify-center">
      <Image
        src={openFridge}
        alt="Open fridge with food"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}

export default GridPlaceHolderImage;
