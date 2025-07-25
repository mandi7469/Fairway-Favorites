import React from "react";
import "../css/PDGA.css";

function PDGA() {
  return (
    <div className="pdga-container">
      <h1>UDisc Course Directory</h1>
      <p className="explore">
        Explore disc golf courses around the world using the official UDisc
        directory
      </p>
      <div className="iframe-wrapper">
        <iframe
          src="https://udisc.com/"
          name="iframe_a"
          className="pdga-iframe"
          title="udisc-iframe"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        >
          Your browser does not support iframes. Please visit{" "}
          <a
            href="https://udisc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            the UDisc website
          </a>{" "}
          directly.
        </iframe>
      </div>
      <p className="link">
        <a href="https://udisc.com/" target="iframe_a">
          UDisc.com
        </a>
      </p>
      <p className="note">
        Note: This search is embedded directly from the UDisc website.
        Functionality is controlled by the external site.
      </p>
    </div>
  );
}

export default PDGA;
