import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from './Input';

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Assuming only one file is allowed to be uploaded
    const file = acceptedFiles[0];

    // You can use FileReader to read the file and set it as the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-6 bg-gray-100 my-5 rounded-md shadow-md">
      {!uploadedImage && (
        <div
          {...getRootProps()}
          className={`dropzone p-4 border-dashed border-2 ${
            isDragActive ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-500">
            Drag & drop an image here, or click to select one
          </p>
        </div>
      )}

      {uploadedImage && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Uploaded Image:</h4>
          <div className="relative w-[100%] pb-[100%]">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-cover absolute"
            />
            <button
              onClick={() => setUploadedImage(null)}
              className="btn btn-sm border-[1.5px] border-black btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <Input
            defaultValue={"some Alt"}
            funcState={''}
            placeholder={"Featured ImageAlt"}
            label={"ImageAlt"}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
