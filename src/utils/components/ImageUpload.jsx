import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from './Input';
import { updateImageToStorage } from '../func/firebaseFunc';

const ImageUpload = ({ setState, state,style }) => {
  const [getDownloadURL, setGetDownloadURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    updateImageToStorage(file, "categories", setGetDownloadURL, setLoading, setError)
  };

  useEffect(() => {
    setState({ ...state, "imageSrc": getDownloadURL })
  }, [getDownloadURL])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={`p-6 bg-gray-100 my-5 rounded-md shadow-md ${style && state?.imageSrc && style}`}>
      {!state?.imageSrc && (
        <div
          {...getRootProps()}
          className={`dropzone p-4 border-dashed border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300'
            }`}
        >
          <input {...getInputProps()} />
          {!error && <p className="text-center text-gray-500">
            {loading ? <span className="loading loading-spinner loading-md"></span> : "Drag & drop an image here, or click to select one"}
          </p>}
          {error && <p className="text-center text-gray-500">Error : Upload filed!</p>}
        </div>
      )}

      { state?.imageSrc && (
        <div className={` ${style ? style : ""}`}>
          <h4 className="text-lg font-semibold mb-2">Uploaded Image:</h4>
          <div className="relative w-[100%] pb-[100%]">
            <img
              src={state?.imageSrc}
              alt="Uploaded"
              className="w-full h-full object-cover absolute"
            />
            <button
              onClick={() => {
                setGetDownloadURL(null)
                setState({ ...state, "imageSrc": "" })
              }}
              className="btn btn-sm border-[1.5px] border-black btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <Input
            // defaultValue={"some Alt"}
            value={state?.imageAlt}
            funcState={(e) => setState({ ...state, "imageAlt": e.target.value })}
            placeholder={"Featured ImageAlt"}
            label={"ImageAlt"}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
