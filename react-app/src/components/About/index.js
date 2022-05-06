import { NavLink } from "react-router-dom";
import './index.css';

const Footer = () => {
    return (
        <div className='footer-wrapper'>
            <NavLink to="https://www.linkedin.com/in/arianna-robinson/">Arianna Robinson</NavLink>
            <NavLink to="https://www.linkedin.com/in/kristen-reid-a4b499202/">Kristen Reid</NavLink>
            <NavLink to="https://www.linkedin.com/in/rami-martinez-2931099b/">Rami Martinez</NavLink>
            <NavLink to="https://www.linkedin.com/in/schoi017/">Steve Choi</NavLink>
        </div>
    )
}

export default Footer
