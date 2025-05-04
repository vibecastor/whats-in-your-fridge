"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Ingredient from "../types/ingredient";
import validateBase64 from "../utilities/validateBase64";
import { Refrigerator } from "lucide-react";

/** PROPS TYPES */
interface ImageUploadButtonProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

// Configuration for image compression
const COMPRESSION_QUALITY = 0.6; // 70% quality
const MAX_WIDTH = 1000; // Maximum width in pixels
const MAX_HEIGHT = 1000; // Maximum height in pixels

/** MAIN EXPORT */
function ImageUpload({
  setIngredients,
  setLoading,
  isLoading,
}: ImageUploadButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
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

  // Compress image to reduce size before processing
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;

        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }

          // Create canvas for compression
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to compress image"));
                return;
              }

              // Create new file from blob
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              console.log(
                `Original size: ${(file.size / 1024).toFixed(
                  2
                )}KB, Compressed size: ${(compressedFile.size / 1024).toFixed(
                  2
                )}KB`
              );
              resolve(compressedFile);
            },
            "image/jpeg",
            COMPRESSION_QUALITY
          );
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Helper functions for handleSubmit
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        if (!validateBase64(base64Image)) {
          reject(new Error("Invalid base64 image"));
          return;
        }
        resolve(base64Image);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const fetchImageAnalysis = async (base64Image: string, fileType: string) => {
    const payload = {
      image: base64Image.split(",")[1],
      mimeType: fileType,
    };

    const response = await fetch("/api/imageDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  };

  const resetForm = () => {
    setFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);
    setError(undefined);

    try {
      // Step 1: Compress the image
      const compressedFile = await compressImage(file);

      // Step 2: Process the compressed image
      const base64Image = await processImage(compressedFile);

      // Step 3: Send to API and get analysis
      const data = await fetchImageAnalysis(base64Image, compressedFile.type);

      // Step 4: Handle the response
      if (!data.error) {
        setIngredients(data.ingredients);
      } else {
        console.error("[ERROR]: Error fetching image description:", data);
        setError(data.error);
      }
    } catch (error) {
      console.error("[ERROR]: when submitting imageUpload form:", error);
      setError(
        "[ERROR]: Something went wrong during image upload. Please try again."
      );
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-md shadow-md bg-card-bg border-card-border transition-colors">
      <form
        ref={formRef}
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-2 sm:py-3 font-bold text-orange-600 dark:text-orange-600 transition-colors">
          <Refrigerator className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-orange-600 dark:text-orange-600" />
          Upload Your Fridge
        </h2>
        <h3 className="text-center text-l py-3 text-foreground opacity-80 transition-colors">
          Upload a photo of your fridge to get started.
        </h3>
        <label className="flex justify-center cursor-pointer bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 my-3 rounded min-w-48 transition duration-200 ease-in-out transform hover:scale-105">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
            disabled={isLoading}
          />
          {isLoading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
