import React from "react"

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6  text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Access Hedra
        </h2>

        <button className="w-full py-2 mb-4 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full text-white text-lg">
          Use Google Login
        </button>

        <div className="flex items-center justify-center mb-4 text-gray-400">
          <span className="border-b border-gray-600 w-1/5"></span>
          <span className="px-2">or</span>
          <span className="border-b border-gray-600 w-1/5"></span>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 bg-[#0e0f10] text-gray-400 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 bg-[#0e0f10] text-gray-400 rounded-lg focus:outline-none"
        />

        <button className="w-full py-2 mb-4 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full text-white text-lg">
          Sign In with Email
        </button>

        <div className="text-center text-gray-400">
          <p className="mb-2">
            Don't have an account?{" "}
            <a href="#" className="text-white underline">
              Sign Up
            </a>
          </p>
          <p>
            <a href="#" className="text-white underline">
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
