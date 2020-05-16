import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <p className="redes">S&#237;guenos en las redes: </p>
            <ul>
                <li><a href="https://twitter.com/Ale_Murawczik"><img src="./img/twitter.png" alt="twitter"/></a></li>
                <li><a href="https://www.instagram.com/elpuntoazul/"><img src="./img/instagram.png" alt="instagram"/></a></li>
                <li><a href="https://www.linkedin.com/in/alejandro-murawczik/"><img src="./img/linkedin.png" alt="linkedin"/></a></li>
                <li><a href="tel:695 261 173"><img src="./img/whatsapp.png" alt="whatsapp"/></a></li>
            </ul>
            <p className="made">Made with <span role="img" aria-label="heart">💙</span> By Alex - for Ironhack Projects &#169; 2020</p>
        </footer>
    )
}
export default Footer