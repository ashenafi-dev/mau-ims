import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>About Us</h1>
        <p>
          Learn more about our mission, vision, and the team behind the
          Inventory Management System.
        </p>
      </header>
      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a robust, efficient, and user-friendly
            inventory management solution that empowers businesses to streamline
            their operations and maximize productivity.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where businesses of all sizes can manage their
            inventory with ease, accuracy, and peace of mind, enabling them to
            focus on growth and innovation.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Team</h2>
          <p>Meet the dedicated professionals who make it all possible:</p>
          <ul className="team-list">
            <li>
              <strong>John Doe</strong> - CEO & Co-Founder
            </li>
            <li>
              <strong>Jane Smith</strong> - CTO & Co-Founder
            </li>
            <li>
              <strong>Emily Johnson</strong> - Lead Developer
            </li>
            <li>
              <strong>Michael Brown</strong> - Product Manager
            </li>
            <li>
              <strong>Sarah Davis</strong> - UX/UI Designer
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
