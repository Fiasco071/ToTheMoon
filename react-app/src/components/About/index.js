import { NavLink } from "react-router-dom";
import { ReactComponent as GitHub } from "../../svgImg/github.svg";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <a href="https://www.linkedin.com/in/arianna-robinson/">
        Arianna Robinson
      </a>
      <a href="https://www.linkedin.com/in/kristen-reid-a4b499202/">
        Kristen Reid
      </a>
      <a href="https://www.linkedin.com/in/rami-martinez-2931099b/">
        Rami Martinez
      </a>
      <a href="https://www.linkedin.com/in/schoi017/">Steve Choi</a>
      <a href="https://github.com/Fiasco071/ToTheMoon">
        <GitHub />
      </a>
    </div>
  );
};

export default Footer;
