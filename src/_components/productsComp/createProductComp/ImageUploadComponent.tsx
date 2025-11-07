import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const ImageUploadComponent = ({ uploadData, setUploadData }:any) => {
  // Store file objects instead of base64
  const [previewUrls, setPreviewUrls] = useState(["", "", ""]); // For display

  console.log("Upload Data:", uploadData);
  console.log("Upload previewUrls:", previewUrls);

  const handleImagePick = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target?.files[0];
      if (file) {
        const newUploadData = [...uploadData];
        const newPreviewUrls = [...previewUrls];

        // Clean up previous object URL if it exists
        if (previewUrls[index]) {
          URL.revokeObjectURL(previewUrls[index]);
        }

        newUploadData[index] = file; // Store the actual file
        newPreviewUrls[index] = URL.createObjectURL(file); // Create object URL for preview

        setUploadData(newUploadData);
        setPreviewUrls(newPreviewUrls);
      }
    };
    input.click();
  };

  const handleRemoveImage = (index: number) => {
    const newUploadData = [...uploadData];
    const newPreviewUrls = [...previewUrls];

    // Clean up object URL
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    newUploadData[index] = null;
    newPreviewUrls[index] = "";

    setUploadData(newUploadData);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div className="flex-1 flex flex-row justify-between">
      {uploadData?.map((item, index) => (
        <div className="flex-1" key={index}>
          <button className="w-full" onClick={() => handleImagePick(index)}>
            {item ? (
              <div className="h-32 rounded-md border border-gray-300 m-1 flex items-center justify-center overflow-hidden">
                <img
                  src={previewUrls[index]}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-32 rounded-md bg-green-100 border border-gray-300 m-1 flex items-center justify-center hover:bg-green-200 transition-colors">
                <Plus size={24} className="text-green-600" />
              </div>
            )}
          </button>

          <div className="flex flex-row justify-center items-center">
            {item && (
              <button
                onClick={() => handleRemoveImage(index)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors p-1"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageUploadComponent;
