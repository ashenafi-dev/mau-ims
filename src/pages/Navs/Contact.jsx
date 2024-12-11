import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Were here to help you! Reach out to us via any of the methods below:
        </p>
      </header>
      <section className="contact-details">
        <div className="contact-method">
          <h2>Email</h2>
          <p>
            Send us an email at{" "}
            <a href="mailto:support@inventorysystem.com">
              support@inventorysystem.com
            </a>{" "}
            for any inquiries or support requests.
          </p>
        </div>
        <div className="contact-method">
          <h2>Phone</h2>
          <p>
            Call us at <a href="tel:+123456789">+123 456 789</a>. Our lines are
            open from 9 AM to 5 PM, Monday to Friday.
          </p>
        </div>
        <div className="contact-method">
          <h2>Address</h2>
          <p>Visit us at:</p>
          <address>
            123 Inventory St,
            <br />
            System City, SC 12345,
            <br />
            United States
          </address>
        </div>
        <div className="contact-method">
          <h2>Social Media</h2>
          <p>Connect with us on social media:</p>
          <ul className="social-media-links">
            <li>
              <a
                href="https://twitter.com/inventorysystem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/inventorysystem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/inventorysystem"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
