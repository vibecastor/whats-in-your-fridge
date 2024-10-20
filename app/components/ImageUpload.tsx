"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Ingredient from "../types/ingredient";
import validateBase64 from "../utilities/validateBase64";

/** PROPS TYPES */
interface ImageUploadButtonProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

/** MAIN EXPORT */
function ImageUpload({ setIngredients }: ImageUploadButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (file && formRef.current) {
      const syntheticEvent = {
        preventDefault: () => {},
        target: formRef.current,
      } as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(syntheticEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64Image = reader.result as string;

          if (!validateBase64(base64Image)) {
            setError(
              "[ERROR]: Something went wrong during image upload.  Please try again."
            );
            setIsLoading(false);
          }

          const payload = {
            image: base64Image.split(",")[1],
            mimeType: file.type,
          };

          // ********************************************** //
          // *** NEXT API ROUTE: /api/imageDescription  *** //
          // ********************************************** //

          const response = await fetch("/api/imageDescription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (!data.error) {
            setIngredients(data.ingredients);
          } else {
            console.error("[ERROR]: Error fetching image description:", data);

            setError(data.error);
          }

          setFile(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.error("[ERROR]: when submitting imageUpload form:", error);
      setError(
        "[ERROR]: Something went wrong during image upload.  Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-md shadow-md bg-white">
      <form
        ref={formRef}
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-5xl py-2">Upload Your Fridge</h2>
        <h3 className="text-l py-2">
          Upload a photo of your fridge to get started.
        </h3>
        <label className=" flex justify-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 my-3 rounded min-w-48">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          {isLoading && (
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isLoading ? "Processing" : "Upload Image"}
        </label>
        <p className="text-red-700">{error}</p>
      </form>
    </div>
  );
}

export default ImageUpload;
