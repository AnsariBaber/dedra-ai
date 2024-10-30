"use client"
import { useState, useEffect } from "react"
import { MdDone } from "react-icons/md"
import { useDropzone } from "react-dropzone"
import { MdOutlineAudiotrack } from "react-icons/md";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  // borderRadius: 2,
  // border: "1px solid #eaeaea",
  marginBottom: 8,
  width: "100%",
  padding: 4,
  boxSizing: "border-box",
}

const audioPlayer = {
  width: "100%",
  marginTop: 8,
}

const AudioData = () => {
  const [activeTab, setActiveTab] = useState("generate")
  const [audioFile, setAudioFile] = useState(null)
  const [error, setError] = useState("")

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files)
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"))

    if (audioFiles.length > 0) {
      setAudioFile(audioFiles[0])
      setError("")
    } else {
      setError("Please drop a valid audio file.")
    }
  }

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files)
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"))

    if (audioFiles.length > 0) {
      setAudioFile(audioFiles[0])
      setError("")
    } else {
      setError("Please select a valid audio file.")
    }
  }
  // const [isRecording, setIsRecording] = useState(false);
  // const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [audioChunks, setAudioChunks] = useState([]);

  // // Request user permission to use the microphone
  // useEffect(() => {
  //   const getUserMedia = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //       const recorder = new MediaRecorder(stream);
  //       setMediaRecorder(recorder);
  //     } catch (error) {
  //       console.error('Error accessing microphone:', error);
  //     }
  //   };

  //   getUserMedia();
  // }, []);

  // const startRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.start();
  //     setIsRecording(true);
  //     mediaRecorder.ondataavailable = (event) => {
  //       setAudioChunks((prev) => [...prev, event.data]);
  //     };
  //   }
  // };

  // const stopRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //     mediaRecorder.onstop = () => {
  //       const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       const audio = new Audio(audioUrl);
  //       audio.play(); // Optional: Play the recorded audio
  //       // Reset audio chunks
  //       setAudioChunks([]);
  //     };
  //   }
  // };
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [], // Accept audio files only
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

  const audioPreviews = files.map((file) => (
    <div style={thumb} key={file.name}>
      <audio controls style={audioPlayer}>
        <source src={file.preview} type={file.type} />
        Your browser does not support the audio element.
      </audio>
      {/* <p>{file.name}</p> */}
    </div>
  ))

  useEffect(() => {
    // Revoke data URIs to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])
  return (
    <div className="bg-[#15171A] text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 rounded-full focus:outline-none ${
            activeTab === "generate"
              ? "bg-gray-700 text-white"
              : "bg-transparent text-gray-400"
          }`}
          onClick={() => setActiveTab("generate")}
        >
          Generate audio
        </button>
        <button
          className={`px-4 py-2 rounded-full focus:outline-none ${
            activeTab === "import"
              ? "bg-gray-700 text-white"
              : "bg-transparent text-gray-400"
          }`}
          onClick={() => setActiveTab("import")}
        >
          Import audio
        </button>
      </div>

      {/* Content based on the active tab */}
      {activeTab === "generate" && (
        <div>
          {/* Text input box for Generate Audio */}
          <div className="bg-[#090A0B] p-4 rounded-lg mb-4">
            <textarea
              placeholder="You can write the beginning of a dialogue, or you can try typing a single word."
              className="w-full bg-transparent text-white outline-none resize-none"
              rows="4"
              maxLength="300"
            ></textarea>
            <div className="text-right text-gray-500">0 / 300</div>
          </div>

          {/* Preview Button */}
          <div className="flex justify-end mb-4">
            <button className="bg-black-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded-full border border-blue-500 shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center focus:outline-none">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
              Preview
            </button>
          </div>
          <div className="flex justify-between my-3">
            <span className="text-gray-400">Voices</span>

            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg focus:outline-none">
              New voice +
            </button>
          </div>
          <div className="bg-[#090A0B] py-2 px-2 ml-2 rounded-lg flex justify-between items-center">
  <div className="relative w-44">
    <select className="bg-gray-700 text-white w-full px-4 py-2 pr-10 rounded-lg appearance-none focus:outline-none">
      <option>Choose a voice</option>
      <option>Voice 1</option>
      <option>Voice 2</option>
      <option>Voice 3</option>
    </select>
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>
        </div>
      )}

      {activeTab === "import" && (
        <div>
          {/* Content for Import Audio Tab */}
          <div className="bg-[#090A0B] p-6 rounded-lg flex flex-col items-center justify-center mb-4">
            <div className="border-2 border-dashed border-gray-500 p-4 rounded-full mb-4 cursor-pointer">
              <section className="container">
                <div
                  {...getRootProps({
                    className:
                      "dropzone ",
                  })}
                >
                  <input {...getInputProps()} />
                  <MdOutlineAudiotrack className="w-12 h-12 text-gray-500" />
                </div>
              </section>
            </div>
            <p className="text-center text-gray-400 mb-2">
              Drag and drop audio here or click to upload
            </p>
            <p className="text-center text-gray-500 text-sm">
              Supported audio formats: .mp3 / .wav
            </p>
          </div>
          {/* <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button> */}
          {/* <div className="bg-[#090A0B] p-4 rounded-lg mb-4">
          <p className="text-gray-400">Import your audio file here.</p>
          <input
            type="file"
            className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg mt-2 focus:outline-none"
            accept="audio/*"
          />
        </div> */}
          <div className="my-2">
            <aside style={thumbsContainer}>{audioPreviews}</aside>
          </div>
        </div>
      )}

      {/* Choose a voice section */}
    </div>
  )
}

export default AudioData
