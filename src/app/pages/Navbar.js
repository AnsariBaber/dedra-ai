"use client"
import { useState } from "react"
import { FaDiscord } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoPersonCircleOutline } from "react-icons/io5"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="bg-[#090A0B]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center md:hidden z-40">
            <a
              href="/"
              className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md text-xl mb-4"
            >
              Create
            </a>
            <a
              href="/home"
              className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md text-xl mb-4"
            >
              Stylize
            </a>
            <div className="flex space-x-4">
              <a
                href="/"
                className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md text-2xl"
              >
                <FaDiscord />
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md text-2xl"
              >
                <FaXTwitter />
              </a>
              <a
                href="/profile"
                className="block text-2xl px-3 py-2 text-white hover:bg-[#15171A] rounded-md"
              >
                <IoPersonCircleOutline />
              </a>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center">
          <a
            href="/"
            className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md md:ml-4"
          >
            Create
          </a>
          <a
            href="/home"
            className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md md:ml-4"
          >
            Stylize
          </a>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex md:items-center">
          <a
            href="/"
            className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md md:ml-4"
          >
            <FaDiscord />
          </a>
          <a
            href="/about"
            className="block px-3 py-2 text-white hover:bg-[#15171A] rounded-md md:ml-4"
          >
            <FaXTwitter />
          </a>
          <a
            href="/profile"
            className="block text-2xl px-3 py-2 text-white hover:bg-[#15171A] rounded-md md:ml-4"
          >
            <IoPersonCircleOutline />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
