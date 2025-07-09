import React from "react";
import "../css/PDGA.css";

function PDGA() {
  return (
    <div className="pdga-container">
      <h1>PDGA Disc Golf Course Directory</h1>
      <p className="explore">
        Explore disc golf courses around the world using the official PDGA
        directory map
      </p>
      <div className="iframe-wrapper">
        <iframe
          src="https://www.pdga.com/course-directory"
          name="iframe_a"
          className="pdga-iframe"
          title="PDGA Disc Golf Course Directory Map"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        ></iframe>
      </div>
      <p className="link">
        <a href="https://www.pdga.com/course-directory" target="iframe_a">
          pdga.com/course/directory
        </a>
      </p>
      <p className="note">
        Note: This map is embedded directly from the PDGA website. Functionality
        is controlled by the external site.
      </p>
    </div>
  );
}

export default PDGA;
