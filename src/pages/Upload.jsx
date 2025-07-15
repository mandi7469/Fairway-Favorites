import React from "react";
import "../css/Upload.css";

function Upload() {
  return (
    <div className="container">
      <header className="app-header">
        <h1>Disc Golf Video Feed</h1>
      </header>

      <div className="main-content">
        <div className="upload-section">
          <h2>Upload your shots!</h2>
          <input type="file" accept="video/*" aria-label="Upload video file" />
          <textarea
            placeholder="Add a description for your video..."
            rows="3"
            aria-label="Video description"
          ></textarea>
          <button className="upload-button">Upload Video</button>
        </div>
        
        <div className="video-feed">
          <h2>Recent Videos</h2>
          <p className="no-videos">
            No videos yet. Upload your favorite disc golf throws!
          </p>
          <div className="video-card">
            
                

          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
