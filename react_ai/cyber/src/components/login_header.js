import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Section from './section';
import Footer from './footer';

const LoginHS = () => {
  const navigate = useNavigate(); // ✅ must be inside component

 
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  

  const goToProfileUpdate = () => {
    const userId = sessionStorage.getItem("userId");
    navigate(`/update-profile`);
  };

  const goToDeepFake = () => {
    navigate('/Deepfake');
  };

   const goToUserhome = () => {
    navigate('/user-home');
  };

    const goToUserReg = () => {
    navigate('/register_user');
  };

  const goToSpamChecker = () => {
    navigate('/Spam-finder');
  };
  const goToBreacher = () => {
    navigate('/breacher');
  };
  const goToPhishingDetector = () => {
    navigate('/phishingdetection');
  };

  return (
    
    
    <>
      {/* Start Navbar Area Header */}
      <div className="navbar-area style-2">
        <div className="mobile-responsive-nav">
          <div className="container">
            <div className="mobile-responsive-menu">
              <div className="logo">
                <a href="index.html">
                  {/* <img src="assets/images/white-logo.png" className="main-logo" alt="logo" /> */}
                  <img src={`${process.env.PUBLIC_URL}/assets/images/white-logo.png`} alt="logo" />

                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="desktop-nav style-2">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              <a className="navbar-brand me-0" href="/">
                <img src="assets/user/images/white-logo.png" className="black-logo" alt="logo" />
              </a>

              <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                   <Link to="/" className="nav-link">
                    {/* <Link to="/Deepfake" className="nav-link dropdown-toggle"> */}
                      Home
                    </Link>
                    {/* <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a href="index.html" className="nav-link">Home 01</a>
                      </li>
                      <li className="nav-item">
                        <a href="index-2.html" className="nav-link">Home 02</a>
                      </li>
                      <li className="nav-item">
                        <a href="index-3.html" className="nav-link">Home 03</a>
                      </li>
                    </ul> */}
                  </li>

                  <li className="nav-item">
                      <Link to="/log" className="nav-link ">
                      Phishing Checker
                    </Link>
                    {/* <a href="about.html" className="nav-link">About</a> */}
                  </li>

                  {/* <li className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle">
                      Services
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a href="services.html" className="nav-link">Services</a>
                      </li>
                      <li className="nav-item">
                        <a href="service-details.html" className="nav-link">Services Details</a>
                      </li>
                    </ul>
                  </li> */}

                  <li className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle">
                      Tools
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                          <Link to="/log" className="nav-link">
                      Spam Checker
                    </Link>
                        {/* <a href="faq.html" className="nav-link">FAQ</a> */}
                      </li>
                      <li className="nav-item">
                         <Link to="/log" className="nav-link">
                      Email Breach Tools
                    </Link>
                        {/* <a href="team.html" className="nav-link">Team</a> */}
                      </li>
                      {/* <li className="nav-item">
                        <a href="pricing.html" className="nav-link">Pricing</a>
                      </li>
                      <li className="nav-item">
                        <a href="login.html" className="nav-link">Log in</a>
                      </li>
                      <li className="nav-item">
                        <a href="register.html" className="nav-link">Register</a>
                      </li>
                      <li className="nav-item">
                        <a href="search-result.html" className="nav-link">Search Result</a>
                      </li>
                      <li className="nav-item">
                        <a href="testimonials.html" className="nav-link">Testimonials</a>
                      </li>
                      <li className="nav-item">
                        <a href="privacy-policy.html" className="nav-link">Privacy Policy</a>
                      </li>
                      <li className="nav-item">
                        <a href="terms-conditions.html" className="nav-link">Terms & Conditions</a>
                      </li> */}
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle">
                      Service
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/log" className="nav-link">
                      Login
                    </Link>
                        
                        {/* <a href="blog.html" className="nav-link">Blog</a> */}
                      </li>
                      <li className="nav-item">
                        <Link to="/register_user" className="nav-link">
                      Registration 
                    </Link>

                        {/* <a href="blog-details.html" className="nav-link">Blog Details</a> */}
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="/log" className="nav-link">
                      Deepfake
                    </Link>
                    
                    {/* <a href="\react_ai\cyber\src\components\about.html" className="nav-link">About</a> */}
                  </li>
                </ul>

                <div className="others-options">
                  <ul>
                    {/* <li>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="ri-search-line"></i>
                      </button>
                    </li> */}
                    <li>
                      <Link to="/log" className="default-btn text-decoration-none">
                      <i className="ri-arrow-right-line"></i>
                      Login
                    </Link>

                      {/* <a className="default-btn text-decoration-none" href="contact.html">
                        <i className="ri-arrow-right-line"></i>
                        Get A Quote
                      </a> */}
                      <a className="quote d-none text-decoration-none" href="contact.html">
                        <i className="ri-chat-quote-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="others-option-for-responsive">
          <div className="container">
            <div className="dot-menu">
              <div className="inner">
                <div className="circle circle-one"></div>
                <div className="circle circle-two"></div>
                <div className="circle circle-three"></div>
              </div>
            </div>

            <div className="container">
              <div className="option-inner">
                <div className="others-options justify-content-center d-flex align-items-center">
                  <ul>
                    <li>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="ri-search-2-line"></i>
                      </button>
                    </li>
                    <li>
                      <a className="quote text-decoration-none" href="contact.html">
                        <i className="ri-chat-quote-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* End Navbar Area Header */}
      <Section>

      </Section>

      <Footer></Footer>

    </>
  );
};

export default LoginHS;
