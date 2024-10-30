"use client";
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import AudioBox from '../pages/AudioBox'
import ImageUpload from '../pages/ImageUpload'
import GenrateVideo from '../pages/GenrateVideo'

const page = () => {
  return (
    <Provider store={store}>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 justify-items-stretch gap-4 py-3 ">
        <div className="">
          <AudioBox />
        </div>
        <div className="">
          <ImageUpload />
        </div>
        <div className="">
          <GenrateVideo />
        </div>
        {/* Additional boxes can be added here */}
      </div>
      </Provider>
  )
}

export default page