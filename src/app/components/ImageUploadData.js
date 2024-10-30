"use client"
import { useState, useEffect, useCallback } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { IoCameraOutline } from "react-icons/io5"
import { MdOutlineFileDownload } from "react-icons/md"
import { IoIosAdd } from "react-icons/io"
import { useDropzone } from "react-dropzone"
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

const ImageUploadData = () => {
  const [files, setFiles] = useState([])
  const [description, setDescription] = useState("")
  const [generatedImage, setGeneratedImage] = useState(null)
  const [jobId, setJobId] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  


  
  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("aspect_ratio", "1:1"); 

    try {
      const imageResponse = await axios.post(
        "https://mercury.dev.dream-ai.com/api/v1/portrait",
        formData,
        {
          headers: {
            Authorization: `Bearer sk_hedra-DOx6xU0yQA1rDCqIOrxJQnkXN4P3XsOv72Om2CPbKOAARIlJlDvpR56A8Ulw1kU_`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = imageResponse.data.url; 
      
      setGeneratedImage(imageUrl);

      // Second API call: Initialize character generation
      const characterResponse = await axios.post(
        "https://mercury.dev.dream-ai.com/api/v1/characters",
        {
          text: description, // Optional description or text for character generation
          avatarImage: imageUrl, // Use the URL from the image upload response
          aspectRatio: "1:1", // Aspect ratio, optional
          audioSource: "tts", // Text-to-speech audio source
        },
        {
          headers: {
            Authorization: `Bearer sk_hedra-DOx6xU0yQA1rDCqIOrxJQnkXN4P3XsOv72Om2CPbKOAARIlJlDvpR56A8Ulw1kU_`, // Replace with your API key
            "Content-Type": "application/json",
          },
        }
      );

      setJobId(characterResponse.data.jobId); // Store the returned jobId
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])
  return (
    <div className="bg-[#15171A] text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
      <div className="flex justify-center py-2 px-1">
      <IoPersonCircleOutline className="w-6 h-6 mr-1"/>
        <h2 className="text-lg font-semibold">Character</h2>
      </div>
        <div className="flex space-x-2">
          <button className="bg-gray-800 p-1.5 rounded-full hover:bg-gray-700">
            <span className="text-xs">1:1</span>
          </button>
          <button className="bg-gray-800 p-1.5 rounded-full hover:bg-gray-700">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
              <path d="M11 6h2v6h-2zM11 15h2v2h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Upload Area */}

      <div className="bg-[#090A0B] p-6 rounded-lg flex flex-col items-center justify-center mb-4">
        {thumbs && thumbs.length > 0 ? (
          <aside style={thumbsContainer}>{thumbs}</aside>
        ) : (
          <div className="p-6 rounded-lg flex flex-col items-center justify-center mb-4">
            <div className="border-2 border-dashed border-gray-500 p-4 rounded-full mb-4 cursor-pointer">
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <MdOutlineAddPhotoAlternate className="w-12 h-12 text-gray-500" />
                  <input {...getInputProps()} />
                </div>
                {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
              </section>
            </div>
            <p className="text-center text-gray-400 mb-2">
              Drag and drop an image here, click to upload, or paste from your
              clipboard
            </p>
            <p className="text-center text-gray-500 text-sm">
              Supported image formats: jpeg / .png / .webp
            </p>
          </div>
        )}
      </div>
      {/* Policies */}
      <p className="text-xs text-center text-gray-500 mb-4">
        Your use of the Hedra platform, including all content you upload, is
        subject to, as applicable, the Hedra Privacy Policy, Hedra Terms of Use,
        Hedra Acceptable Use Policy, and Hedra Biometric Data Privacy Policy.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-around mb-4">
        <button className="bg-[#090A0B] p-2 rounded-full hover:bg-gray-700">
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <MdOutlineAddPhotoAlternate className="w-6 h-6 text-gray-400" />
              <input {...getInputProps()} />
            </div>
          </section>
        </button>
        <button className="bg-[#090A0B] p-2 rounded-full hover:bg-gray-700">
          <IoCameraOutline className="w-6 h-6 text-gray-400" />
        </button>
        <button className="bg-[#090A0B] p-2 rounded-full hover:bg-gray-700">
          <MdOutlineFileDownload className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Description Input */}
      <textarea
        placeholder="Describe your character and click 'Create' to generate"
        className="w-full bg-[#090A0B] text-gray-400 p-3 rounded-lg outline-none resize-none mb-4"
        rows="2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
       {generatedImage && (
        <img src={generatedImage} alt="Generated" className="rounded-lg mb-4" />
      )}

      {jobId && (
        <p className="text-center text-green-500 mb-4">
          Character generation initialized! Job ID: {jobId}
        </p>
      )}

      {/* Create Button */}
      <button onClick={handleSubmit}  className="bg-gradient-to-r from-[#ff4d8d] to-[#ff8d4d] w-full py-2 rounded-full flex items-center justify-center focus:outline-none">
        <span>Create</span>
        <IoIosAdd className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

export default ImageUploadData
