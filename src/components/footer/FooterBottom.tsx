import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'; // Import icons

const FooterBottom = () => (
  <div className="footer-bottom">
    <p>Built by Mustafa Kumshi</p>
    <div className="social-icons">
      <a href="https://github.com/mustafakumshi" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} />
      </a>
      <a href="https://www.linkedin.com/in/mustafakumshi/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={24} />
      </a>
      <a href="https://www.instagram.com/mustafa_kumshi/" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={24} />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100005183384831" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={24} />
      </a>
    </div>
  </div>
);

export default FooterBottom;
