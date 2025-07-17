// imports
import { useState, useRef, useEffect } from "react";
import "../css/Upload.css";

function Upload() {
  const [videos, setVideos] = useState([]);
  // state to hold the description for the current video being uploaded
  const [currentDescription, setCurrentDescription] = useState("");
  // ref for the file input element to programmatically click it
  const fileInputRef = useRef(null);

  // effect to clean up Blob URLs when the component unmounts or videos change, this prevents memory leaks by revoking object URLs
  useEffect(() => {
    return () => {
      videos.forEach((video) => URL.revokeObjectURL(video.url));
    };
  }, [videos]); // re-run when the videos array changes

  // handler for when a file is selected via the input
  const handleVideoUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      // create a URL for the file using URL.createObjectURL. this allows the browser to play the local video file
      const videoUrl = URL.createObjectURL(file);
      const newVideo = {
        id: Date.now(), // unique ID based on timestamp
        url: videoUrl,
        description: currentDescription || "No description provided.", // use current description or default
        timestamp: new Date().toLocaleString(), // formatted timestamp
      };

      // add the new video to the beginning of the videos array (like a social feed)
      setVideos((prevVideos) => [newVideo, ...prevVideos]);
      // clear the description input after upload
      setCurrentDescription("");
      // reset the file input value to allow uploading the same file again
      event.target.value = null;
    }
  };

  // handler for the "Upload Video" button click
  const handleUploadButtonClick = () => {
    // trigger the hidden file input click
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Disc Golf Video Feed</h1>
      </header>

      <div className="main-content">
        <div className="upload-section">
          <h2>Fairway Favorite Videos</h2>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            ref={fileInputRef} // assign the ref to the input
            style={{ display: "none" }} // hide the actual file input
            aria-label="Upload video file"
          />
          <textarea
            placeholder="Add a description for your video..."
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            rows="3"
            aria-label="Video description"
          ></textarea>
          <button className="upload-button" onClick={handleUploadButtonClick}>
            Upload Video
          </button>
        </div>

        <section className="video-feed">
          {videos.length === 0 ? (
            <p className="no-videos">No videos yet. Upload your shots!</p>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="video-card">
                <video controls className="video-player">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-details">
                  <p className="video-description">{video.description}</p>
                  <span className="video-timestamp">
                    Uploaded: {video.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default Upload;
