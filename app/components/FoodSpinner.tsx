import {
  Apple,
  Pizza,
  Coffee,
  Banana,
  Refrigerator,
  Carrot,
  Egg,
} from "lucide-react";

interface FoodSpinnerProps {
  size?: number;
}

const FoodSpinner = ({ size = 64 }: FoodSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Fixed centered container for all rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute w-full h-full rounded-full border-2 border-spinner-ringLight animate-[spin_20s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-red-500">
              <Apple className="w-full h-full" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 text-orange-500">
              <Pizza className="w-full h-full" />
            </div>
          </div>

          {/* Middle Ring */}
          <div className="absolute w-3/4 h-3/4 rounded-full border-2 border-spinner-ringMedium animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-green-400">
              <Coffee className="w-full h-full" />
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 text-yellow-300">
              <Banana className="w-full h-full" />
            </div>
          </div>

          {/* Inner Ring */}
          <div className="absolute w-1/2 h-1/2 rounded-full border-2 border-spinner-ringDark animate-[spin_10s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-orange-300">
              <Carrot className="w-full h-full" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 text-gray-100">
              <Egg className="w-full h-full" />
            </div>
          </div>

          {/* Center with fridge icon - fixed position */}
          <div className="absolute w-16 h-16 bg-spinner-bg rounded-full animate-pulse flex items-center justify-center text-white">
            <Refrigerator className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-foreground">
          Analyzing your fridge contents
        </h3>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          Please wait a moment...
        </p>
      </div>
    </div>
  );
};

export default FoodSpinner;
