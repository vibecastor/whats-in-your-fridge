import openFridge from "../assets/open-fridge.png";
import Image from "next/image";

function GridPlaceHolderImage() {
  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full max-w-md aspect-square">
        <Image
          src={openFridge}
          alt="Open fridge with food"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          priority
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

export default GridPlaceHolderImage;
