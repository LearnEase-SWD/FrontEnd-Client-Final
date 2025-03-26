import { useState } from "react";
import { storage } from "../configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { message } from "antd";

const Firebase = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string>(""); // For fetching by ID
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null); // For fetched image
  const [title, setTitle] = useState<string>(""); // For image title

  // Check if the title already exists in Firebase
  const checkTitleExists = async (title: string): Promise<boolean> => {
    const imageRef = ref(storage, `images/${title}`);
    try {
      // Try to get the download URL to check if the image exists
      await getDownloadURL(imageRef);
      return true; // Title exists
    } catch (error) {
      return false; // Title doesn't exist
    }
  };

  // Upload Image to Firebase with title
  const uploadImage = async () => {
    if (!imageUpload || title.trim() === "") {
      message.error("Please select an image and provide a valid title.");
      return;
    }

    // Check if the title already exists
    const isDuplicate = await checkTitleExists(title);
    if (isDuplicate) {
      message.error("Title already exists. Please choose a different title.");
      return;
    }

    // If title is unique, upload the image
    const imageRef = ref(storage, `images/${title}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url: any) => {
            setImageUrl(url); // Set the uploaded image URL
            message.success("Image uploaded successfully!");
          })
          .catch((error: any) => {
            message.error("Error getting image URL:", error);
          });
      })
      .catch((error: any) => {
        message.error("Upload failed", error);
      });
  };

  // Fetch Image from Firebase by title
  const fetchImageByTitle = () => {
    if (imageId.trim() === "") {
      message.error("Please enter a valid image ID.");
      return;
    }

    const imageRef = ref(storage, `images/${imageId}`);
    getDownloadURL(imageRef)
      .then((url: any) => {
        setFetchedImageUrl(url); // Set the fetched image URL
      })
      .catch((error: any) => {
        message.error("Error fetching image:", error);
        alert("No image found for this ID.");
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 flex mt-10">
        {/* Left Column: Upload Image */}
        <div className="w-1/2 flex flex-col justify-center items-center border-r pr-4">
          <h2 className="mb-4 text-lg">Upload Image</h2>
          <input
            type="file"
            className="mb-4"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageUpload(e.target.files[0]);
              }
            }}
          />
          <input
            type="text"
            placeholder="Enter Image Title"
            value={title}
            className="border mb-4 p-2 w-full"
            onChange={(e) => setTitle(e.target.value)} // Update the title state
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4 cursor-pointer"
            onClick={uploadImage}
          >
            Upload Image
          </button>

          {/* Display Uploaded Image */}
          {imageUrl && (
            <div className="mt-4">
              <p>Uploaded Image:</p>
              <img src={imageUrl} alt="Uploaded" className="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Right Column: Fetch Image by ID */}
        <div className="w-1/2 flex flex-col justify-center items-center pl-4">
          <h2 className="mb-4 text-lg">Get Image by Title</h2>
          <input
            type="text"
            placeholder="Enter Image Title"
            value={imageId}
            className="border mb-4 p-2 w-full"
            onChange={(e) => setImageId(e.target.value)} // Update the imageId state
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded mb-4 cursor-pointer"
            onClick={fetchImageByTitle}
          >
            Get Image
          </button>

          {/* Display Fetched Image */}
          {fetchedImageUrl && (
            <div className="mt-4">
              <p>Fetched Image:</p>
              <img
                src={fetchedImageUrl}
                alt="Fetched"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Firebase;
