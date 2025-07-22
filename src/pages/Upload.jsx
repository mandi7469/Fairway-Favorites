// imports
import { useState, useRef, useEffect } from "react";
import localforage from "localforage";
import "../css/Upload.css";

function Upload() {
  const [videos, setVideos] = useState([]);
  // state to hold the description for the current video being uploaded
  const [currentDescription, setCurrentDescription] = useState("");
  // ref for the file input element to programmatically click it
  const fileInputRef = useRef(null);

  useEffect(() => {
    localforage.config({
      name: "discGolfVideos",
      storeName: "videos",
      description: "Storage for users uploaded disc golf videos",
    });

    // load videos from localForage when the component mounts
    loadVideosFromLocalForage();
  }, []);

  // effect to clean up Blob URLs when the component unmounts or videos change, this prevents memory leaks by revoking object URLs
  useEffect(() => {
    return () => {
      videos.forEach((video) => URL.revokeObjectURL(video.url));
    };
  }, [videos]); // re-run when the videos array changes

  const loadVideosFromLocalForage = async () => {
    try {
      const storedVideos = await localforage.getItem("uploadedVideos"); // key for video array
      if (storedVideos) {
        // recreate Blob URLs for display
        const videosWithUrls = storedVideos.map((video) => ({
          ...video,
          url: URL.createObjectURL(video.file), // 'file' here will be the Blob/File object
        }));
        setVideos(videosWithUrls);
      }
    } catch (err) {
      console.error("Error loading videos from localForage:", err);
    }
  };

  const saveVideosToLocalForage = async (videosToSave) => {
    try {
      // only want to save the raw File/Blob, not the Blob URL, as it's transient
      const videosWithoutUrls = videosToSave.map(
        ({ id, description, timestamp, file }) => ({
          id,
          description,
          timestamp,
          file, // store the actual File/Blob object
        })
      );
      await localforage.setItem("uploadedVideos", videosWithoutUrls);
    } catch (err) {
      console.error("Error saving videos to localForage:", err);
    }
  };

  // handler for when a file is selected via the input
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const newVideo = {
        id: Date.now(),
        url: videoUrl, // this URL is temporary for display
        file: file, // store the actual file (Blob) for persistence
        description: currentDescription || "No description provided.",
        timestamp: new Date().toLocaleDateString(),
      };

      setVideos((prevVideos) => {
        const updatedVideos = [newVideo, ...prevVideos];
        saveVideosToLocalForage(updatedVideos); // save updated videos
        return updatedVideos;
      });
      setCurrentDescription("");
      event.target.value = null;
    }
  };

  const handleDeleteVideo = async (videoIdToDelete) => {
    setVideos((prevVideos) => {
      // find the video to be deleted to revoke its URL
      const videoToDelete = prevVideos.find(
        (video) => video.id === videoIdToDelete
      );
      if (videoToDelete) {
        URL.revokeObjectURL(videoToDelete.url); // revoke the blob URL to free up memory
      }

      // filter out the deleted video
      const updatedVideos = prevVideos.filter(
        (video) => video.id !== videoIdToDelete
      );
      saveVideosToLocalForage(updatedVideos); // save the updated list to localForage
      return updatedVideos;
    });
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
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteVideo(video.id)}
                    aria-label={`Delete video: ${video.description}`}
                  >
                    Delete Video
                  </button>
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
