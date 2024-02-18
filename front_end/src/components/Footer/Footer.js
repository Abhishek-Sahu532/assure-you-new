import React from "react";
import appStore from "../../assets/images/Appstore.png";
import playstore from "../../assets/images/playstore.png";
import "./Footer.css";
import logo from '../../assets/images/logo.png'


const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <img src={playstore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
    <img src={logo} alt='logo' className="logo" />
        <p>Shop Secure, Shop Assure You</p>
        <p>Copyright@2023 &copy; Abhishek </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="1#">Instagram</a>
        <a href="1#">Youtube</a>
        <a href="1#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
