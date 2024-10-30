"use client";
import React from 'react'
import AudioBox from './AudioBox'
import ImageUpload from './ImageUpload'
import GenrateVideo from './GenrateVideo'
import { Provider } from 'react-redux';
import store from '../store';

const Layout = () => {
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

export default Layout