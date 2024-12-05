const Support = () => {
  return (
    <div className="support-container">
      <h1>Contact Us</h1>
      <p className="theText">
        If you need assistance, you can reach us through any of the following
        methods:
      </p>
      <div className="contact-methods">
        <div className="contact-method">
          <h2>Email</h2>
          <p>
            <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
          </p>
        </div>
        <div className="contact-method">
          <h2>Phone</h2>
          <p>
            <a href="tel:+1234567890">+1 234 567 890</a>
          </p>
        </div>
        <div className="contact-method">
          <h2>Social Media</h2>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
