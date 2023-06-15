import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p className="footer_text">CodeGenius Studio</p>
        <div className="social_icons">
          <a href="https://twitter.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.facebook.com/MountRainierNPS/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/mountrainiernps/?hl=en">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;

