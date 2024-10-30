"use client";
import React from 'react'
import { IoIosAdd } from "react-icons/io"
import { MdDone } from "react-icons/md"
import { MdOutlineFileDownload } from "react-icons/md"
import { RiShareForwardLine } from "react-icons/ri"

const GenerateVideoData = () => {
  return (
    <div className="bg-[#15171A] text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Character</h2>
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
        <div className="border-2 border-dashed border-gray-500 p-4 rounded-full mb-4">
          <MdDone className="w-12 h-12 text-gray-500" />
        </div>
        <p className="text-center text-gray-400 mb-2">
          Your video will appear here!
        </p>
        <p className="text-center text-gray-500 text-sm">
          Click Generate video button
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around mb-4">
        <div className="flex justify-around mb-4">
          <button className="bg-[#090A0B]  py-2 px-4 rounded-full shadow-md flex items-center justify-center focus:outline-none">
            <MdOutlineFileDownload className="w-5 h-5 m-1" />
            <span>Download</span>
          </button>
        </div>
        <div className="flex justify-around mb-4">
          <button className="bg-[#090A0B] py-2 px-4 rounded-full shadow-md flex items-center justify-center focus:outline-none">
            <RiShareForwardLine className="w-5 h-5 m-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
      {/* Create Button */}
      <button className="bg-gradient-to-r from-[#ff4d8d] to-[#ff8d4d] w-full py-2 rounded-full flex items-center justify-center focus:outline-none">
        <span>Generate Video</span>
        <IoIosAdd className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

export default GenerateVideoData