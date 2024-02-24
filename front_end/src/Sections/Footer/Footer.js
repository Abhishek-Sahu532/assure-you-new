import React from "react";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import copyrightSign from "../../assets/images/copyright-sign.svg";
import "./Footer.css";

const Footer = () => {
  const footerLinks = [
    {
      title: "Category",
      links: [
        { name: "Laptop", link: "/" },
        { name: "Footwear", link: "/" },
        { name: "Bottom", link: "/" },
        { name: "Tops", link: "/" },
        { name: "Attire", link: "/" },
        { name: "Camera", link: "/" },
        { name: "SmartPhones", link: "/" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "About us", link: "/" },
        { name: "FAQs", link: "/" },
        { name: "How it works", link: "/" },
        { name: "Privacy policy", link: "/" },
        { name: "Payment policy", link: "/" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { name: "customer@assureyou.com", link: "" },
        { name: "+91 1234567890", link: "" },
      ],
    },
  ];

  const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
  ];

  return (
    <footer className="footer">
      <div className="FooterLinksDiv">
        <div className="logoSection">
          <h2>Assure You</h2>
          <p>
            Get ready for the new term in your shopping. Find Your perfect
            Sizes. Get Rewards
          </p>
          <div className="socialMediaDiv">
            {socialMedia.map((icon) => (
              <div key={icon.alt}>
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        <div className="categoryDiv">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="">{section.title}</h4>
              <ul className="categoryDivUl">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="copyrightDiv">
        <div className="">
          <img
            src={copyrightSign}
            alt="copyright sign"
            width={20}
            height={20}
          />
          <p> Copyright. All rights reserved.</p>
        </div>
        <div>
          {" "}
          <p className="termsNContidions">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
