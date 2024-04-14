import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

function Navbar() {

return (
    <nav className="navbar">
    <div>Hamza Attarwala's</div>
        <ul>
            <li><a href="https://github.com/HamzaGiTX786/CreditCardFraudDetection" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} className="github-icon"/></a></li>
            <li><a href="https://www.linkedin.com/in/hamza-attarwala" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} className="linkedin-icon"/></a></li>
            <li><a href="mailto:attarwalahamza@gmail.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faEnvelope} className="email-icon"/></a></li>
        </ul>
    </nav>
)

}

export default Navbar;