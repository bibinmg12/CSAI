import React , { useEffect } from 'react';
const Footer = () => {
    useEffect(() => {
    if (window.scrollCue) {
      window.scrollCue.init({
        interval: -200, // optional: tweaks animation speed between elements
        duration: 800,  // optional: animation duration
        percentage: 0.85 // optional: when to start animating (0 to 1)
      });
    }
  }, []);
  return (
    <>
    <div className="footer-area">
      <div className="container">
        <div className="footer-info-area" data-cue="slideInUp">


          {/* <div className="row">
            <div className="col-lg-4">
              <div className="single-footer-info ms-0">
                <a className="text-decoration-none logo" href="index.html"> */}
                  {/* <img src="assets/user/images/white-logo.png" alt="logo" /> */}
                {/* </a>
                <p>
                  Cybersecurity is crucial in today's digital age, where many individuals and
                  organizations store a significant amount of sensitive data on computers...
                </p>
                
              </div>
              <img
  src="/assets/user/images/protection.png"
  alt="Cybersecurity Illustration"
  style={{ width: '100%', maxWidth: '400px', margin: '20px 0', borderRadius: '8px' }}
/>
            </div>
            
            <div className="col-lg-8">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6 col-md-4">
                  <div className="single-footer-info">
                    <h3>Contact Us</h3>
                    <ul className="list-unstyled ps-0 mb-0">
                      <li>
                        <strong>Address : </strong>SNIT Vadakkevila, Kollam, Kerala 691010
                      </li>
                      <li>
                        <strong>Email:</strong>{' '}
                        <a className="text-decoration-none">
                          bibincsai@gmail.com
                        </a>
                      </li>
                      <li>
                        <strong>Phone:</strong>{' '}
                        <a className="text-decoration-none">
                          +91-9947356525
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>          
              </div>
            </div>
          </div> */}

          <div className="row align-items-center justify-content-between">
  {/* Left Side: Quote */}
  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
    <div className="single-footer-info">
      <a className="text-decoration-none logo">
        <img src="assets/user/images/cyber-security.png" alt="logo"
        style={{
        width: '30%',
        maxWidth: '250px',
        height: 'auto',
        borderRadius: '10px'
      }} />
      </a>
      <p style={{ textAlign: 'justify' }}>
        Cybersecurity is crucial in today's digital age, where many individuals and
        organizations store a significant amount of sensitive data on computers...
      </p>
    </div>
  </div>

  {/* Center: Image */}
  <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 d-flex justify-content-center">
    <img
      src="/assets/user/images/protection.png"
      alt="Cybersecurity Illustration"
      style={{
        width: '100%',
        maxWidth: '250px',
        height: 'auto',
        borderRadius: '10px'
      }}
    />
  </div>

  {/* Right Side: Contact Us */}
  <div className="col-lg-4 col-md-6">
    <div className="single-footer-info">
      <h3>Contact Us</h3>
      <ul className="list-unstyled ps-0 mb-0">
        <li>
          <strong>Address:</strong> SNIT Vadakkevila, Kollam, Kerala 691010
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a className="text-decoration-none">bibincsai@gmail.com</a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a className="text-decoration-none">+91-9947356525</a>
        </li>
      </ul>
    </div>
  </div>
</div>



          
        </div>
      </div>
    </div>
       {/* Start Copyright Area */}
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-content text-center" >
            <p>
              Copyright @ 2025 <strong>Cyber Sentinel AI</strong>, All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      {/* End Copyright Area */}     
    </>
  );
};
export default Footer;
