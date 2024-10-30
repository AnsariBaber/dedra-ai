"use client";
import {useState} from 'react'
import AudioData from '../components/AudioData';

const AudioBox = () => {
  const [activeTab, setActiveTab] = useState('generate');
  return (
    <div>
      <AudioData/>
    </div>
);
}

export default AudioBox