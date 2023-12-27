import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <section className="footer__logo-container">
      <picture className="footer__logo">
        <img src="/AWM-logo.svg" alt="Animanga Wrappped" />
      </picture>
      <p>Animanga Wrapped | All rights reserved | Tanuki SAS</p>
    </section>
    <p><a href="./terms-and-conditions">Terms and Conditions</a></p>
    <p><a href="./privacy-policy">Privacy Policy</a></p>

  </footer>
);

export default Footer;
