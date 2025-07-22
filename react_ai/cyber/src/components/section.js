
import React , { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Section = () => {
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  const images = [
    'partner-6.png',
    'partner-7.png',
    'partner-8.png',
    'partner-9.png',
    'partner-10.png',
    'partner-6.png',
    'partner-7.png',
    'partner-8.png',
    'partner-9.png',
    'partner-10.png',
  ];

useEffect(() => {
  if (window.scrollCue) {
    window.scrollCue.init({
      interval: -200,
      duration: 800,
      percentage: 0.85,
    });

    // Manually trigger the scroll logic once
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100); // small delay ensures DOM is fully rendered
  }
}, []);
  return (
    <>

        <div className="banner-area">
            <div className="container-fluid">

                <div className="row align-items-center" data-cues="slideInUp">
                    {/* <div className="row align-items-center"> */}
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <div className="title">
                                <h1>Essential Policy for Cyber security Protection.</h1>
                                <p>In today's increasingly digital world, cybersecurity has become paramount. With the rapid expansion of online activities,</p>
                            </div>
                            {/* <div className="banner-button d-flex align-items-center">
                                <a className="demo text-decoration-none" href="/log">Login</a> */}
                                {/* <div className="play-btn d-flex align-items-center">
                                    <a href="http://www.youtube.com/watch?v=0O2aH4XLbto" className="text-decoration-none popup-youtube icon">
                                        <i className="ri-play-mini-fill"></i>
                                    </a>
                                    <a className="text-decoration-none popup-youtube" href="http://www.youtube.com/watch?v=0O2aH4XLbto">
                                        Watch Intro Video
                                    </a>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-image">
                            <img src="/assets/user/images/hero/hero-2.png" alt="banner-image"/>
                        </div>
                    </div>
                </div>

            </div>
            <div className="shape">
                <div className="shape-2">
                    <img src="/assets/user/images/shape/shape-2.png" alt="shape"/>
                </div>
            </div>
        </div>  

        <div className="security-area style-2 pt-100 pb-75">
      <div className="container">
        <div className="section-title text-center style-2" data-cue="slideInUp">
          <span className="d-block">What We Do</span>
          <h2>Our Extensive Network Security Services.</h2>
        </div>
        <div className="row justify-content-center" data-cues="fadeIn">
          <div className="col-lg-4 col-md-6">
            <div className="single-security-item d-flex align-items-center">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                >
                  <g clipPath="url(#clip0_404_5)">
                    <mask
                      id="mask0_404_5"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="86"
                      height="86"
                    >
                      <path d="M86 0H0V86H86V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_404_5)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.5 0H0V43H21.5C9.62589 43 0 52.626 0 64.5V86H43V64.5C43 76.374 52.626 86 64.5 86H86V43H64.5C76.374 43 86 33.3741 86 21.5V0H43V21.5C43 9.62589 33.3741 0 21.5 0ZM43 43H21.5C33.3741 43 43 52.626 43 64.5V43ZM43 43V21.5C43 33.3741 52.626 43 64.5 43H43Z"
                        fill="url(#paint0_linear_404_5)"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_404_5"
                      x1="43"
                      y1="0"
                      x2="43"
                      y2="86"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A7B5FF" />
                      <stop offset="1" stopColor="#F3ACFF" />
                    </linearGradient>
                    <clipPath id="clip0_404_5">
                      <rect width="86" height="86" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="content">
                <h3>
                  <a className="text-decoration-none" >
                    Unleashing Ability through Network Management.
                  </a>
                </h3>
                <a className="read-more text-decoration-none" href="service-details.html">
                 
                  
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-security-item d-flex align-items-center">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                >
                  <g clipPath="url(#clip0_404_5)">
                    <mask
                      id="mask0_404_5"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="86"
                      height="86"
                    >
                      <path d="M86 0H0V86H86V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_404_5)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.5 0H0V43H21.5C9.62589 43 0 52.626 0 64.5V86H43V64.5C43 76.374 52.626 86 64.5 86H86V43H64.5C76.374 43 86 33.3741 86 21.5V0H43V21.5C43 9.62589 33.3741 0 21.5 0ZM43 43H21.5C33.3741 43 43 52.626 43 64.5V43ZM43 43V21.5C43 33.3741 52.626 43 64.5 43H43Z"
                        fill="url(#paint0_linear_404_5)"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_404_5"
                      x1="43"
                      y1="0"
                      x2="43"
                      y2="86"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A7B5FF" />
                      <stop offset="1" stopColor="#F3ACFF" />
                    </linearGradient>
                    <clipPath id="clip0_404_5">
                      <rect width="86" height="86" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="content">
                <h3>
                  <a className="text-decoration-none">
                    Building a Robust Defense Against Cyber-Attacks.
                  </a>
                </h3>
                <a className="read-more text-decoration-none" href="service-details.html">
                  
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-security-item d-flex align-items-center">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                >
                  <g clipPath="url(#clip0_404_5)">
                    <mask
                      id="mask0_404_5"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="86"
                      height="86"
                    >
                      <path d="M86 0H0V86H86V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_404_5)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.5 0H0V43H21.5C9.62589 43 0 52.626 0 64.5V86H43V64.5C43 76.374 52.626 86 64.5 86H86V43H64.5C76.374 43 86 33.3741 86 21.5V0H43V21.5C43 9.62589 33.3741 0 21.5 0ZM43 43H21.5C33.3741 43 43 52.626 43 64.5V43ZM43 43V21.5C43 33.3741 52.626 43 64.5 43H43Z"
                        fill="url(#paint0_linear_404_5)"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_404_5"
                      x1="43"
                      y1="0"
                      x2="43"
                      y2="86"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A7B5FF" />
                      <stop offset="1" stopColor="#F3ACFF" />
                    </linearGradient>
                    <clipPath id="clip0_404_5">
                      <rect width="86" height="86" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="content">
                <h3>
                  <a className="text-decoration-none">
                    Harnessing the Power of Online Network Security Systems.
                  </a>
                </h3>
                <a className="read-more text-decoration-none" href="service-details.html">
                 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-ellipse"></div>
    </div>


     {/* Start About Area */}
      <div className="about-area style-2 pb-75">
        <div className="container">
          <div className="row align-items-center" data-cue="slideInUp">
            <div className="col-lg-6">
              <div className="about-image style-2">
                <div className="image-1">
                  <img src="assets/user/images/about/about-4.jpg" alt="about-image" />
                </div>
                <div className="image-two">
                  <img src="assets/user/images/about/about-5.jpg" alt="about-image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content style-2">
                <div className="title">
                  <span className="d-block">About CSAI</span>
                  <h2>The Comprehensive Solution for Your Needs.</h2>
                  <p>
                    Organizations are now compelled to complete comprehensive cybersecurity strategies to safeguard
                    their systems, networks, and data from the relentless onslaught of cyber threats, ensuring the
                    protection of privacy...
                  </p>
                </div>
                <div className="content-card d-flex align-items-center">
                  <div className="icon">
                    {/* SVG icon starts here */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <g clipPath="url(#clip0_179_4)">
                        <path d="M15 20C14.0111 20 13.0444 19.7068 12.2221 19.1574C11.3999 18.6079 10.759 17.8271 10.3806 16.9134C10.0022 15.9998 9.90315 14.9945 10.0961 14.0246C10.289 13.0546 10.7652 12.1637 11.4645 11.4645C12.1637 10.7652 13.0546 10.289 14.0245 10.0961C14.9945 9.90315 15.9998 10.0022 16.9134 10.3806C17.827 10.759 18.6079 11.3999 19.1573 12.2222C19.7068 13.0444 20 14.0111 20 15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20ZM15 12.5C14.5055 12.5 14.0222 12.6466 13.6111 12.9213C13.2 13.196 12.8795 13.5865 12.6903 14.0433C12.5011 14.5001 12.4516 15.0028 12.548 15.4877C12.6445 15.9727 12.8826 16.4181 13.2322 16.7678C13.5819 17.1174 14.0273 17.3555 14.5123 17.452C14.9972 17.5484 15.4999 17.4989 15.9567 17.3097C16.4135 17.1205 16.804 16.8001 17.0787 16.3889C17.3534 15.9778 17.5 15.4945 17.5 15C17.5 14.337 17.2366 13.7011 16.7678 13.2322C16.2989 12.7634 15.663 12.5 15 12.5ZM22.5 28.75C22.5 26.7609 21.7098 24.8532 20.3033 23.4467C18.8968 22.0402 16.9891 21.25 15 21.25C13.0109 21.25 11.1032 22.0402 9.6967 23.4467C8.29018 24.8532 7.5 26.7609 7.5 28.75C7.5 29.0815 7.6317 29.3995 7.86612 29.6339C8.10054 29.8683 8.41848 30 8.75 30C9.08152 30 9.39946 29.8683 9.63388 29.6339C9.8683 29.3995 10 29.0815 10 28.75C10 27.4239 10.5268 26.1522 11.4645 25.2145C12.4021 24.2768 13.6739 23.75 15 23.75C16.3261 23.75 17.5979 24.2768 18.5355 25.2145C19.4732 26.1522 20 27.4239 20 28.75C20 29.0815 20.1317 29.3995 20.3661 29.6339C20.6005 29.8683 20.9185 30 21.25 30C21.5815 30 21.8995 29.8683 22.1339 29.6339C22.3683 29.3995 22.5 29.0815 22.5 28.75ZM22.5 10C21.5111 10 20.5444 9.70676 19.7221 9.15735C18.8999 8.60794 18.259 7.82705 17.8806 6.91342C17.5022 5.99979 17.4031 4.99446 17.5961 4.02455C17.789 3.05465 18.2652 2.16373 18.9645 1.46447C19.6637 0.765206 20.5546 0.289002 21.5245 0.0960758C22.4945 -0.0968503 23.4998 0.00216641 24.4134 0.380605C25.327 0.759043 26.1079 1.39991 26.6573 2.22215C27.2068 3.0444 27.5 4.0111 27.5 5C27.5 6.32609 26.9732 7.59785 26.0355 8.53554C25.0979 9.47322 23.8261 10 22.5 10ZM22.5 2.5C22.0055 2.5 21.5222 2.64662 21.1111 2.92133C20.7 3.19603 20.3795 3.58648 20.1903 4.04329C20.0011 4.50011 19.9516 5.00278 20.048 5.48773C20.1445 5.97268 20.3826 6.41814 20.7322 6.76777C21.0819 7.1174 21.5273 7.3555 22.0123 7.45197C22.4972 7.54843 22.9999 7.49892 23.4567 7.3097C23.9135 7.12048 24.304 6.80005 24.5787 6.38893C24.8534 5.9778 25 5.49446 25 5C25 4.33696 24.7366 3.70108 24.2678 3.23224C23.7989 2.76339 23.163 2.5 22.5 2.5ZM30 18.75C29.998 16.7615 29.2072 14.855 27.8011 13.4489C26.395 12.0428 24.4885 11.252 22.5 11.25C22.1685 11.25 21.8505 11.3817 21.6161 11.6161C21.3817 11.8505 21.25 12.1685 21.25 12.5C21.25 12.8315 21.3817 13.1495 21.6161 13.3839C21.8505 13.6183 22.1685 13.75 22.5 13.75C23.8261 13.75 25.0979 14.2768 26.0355 15.2145C26.9732 16.1521 27.5 17.4239 27.5 18.75C27.5 19.0815 27.6317 19.3995 27.8661 19.6339C28.1005 19.8683 28.4185 20 28.75 20C29.0815 20 29.3995 19.8683 29.6339 19.6339C29.8683 19.3995 30 19.0815 30 18.75ZM7.5 10C6.51109 10 5.54439 9.70676 4.72215 9.15735C3.8999 8.60794 3.25904 7.82705 2.8806 6.91342C2.50216 5.99979 2.40315 4.99446 2.59607 4.02455C2.789 3.05465 3.2652 2.16373 3.96447 1.46447C4.66373 0.765206 5.55464 0.289002 6.52455 0.0960758C7.49445 -0.0968503 8.49979 0.00216641 9.41342 0.380605C10.327 0.759043 11.1079 1.39991 11.6573 2.22215C12.2068 3.0444 12.5 4.0111 12.5 5C12.5 6.32609 11.9732 7.59785 11.0355 8.53554C10.0979 9.47322 8.82608 10 7.5 10ZM7.5 2.5C7.00555 2.5 6.5222 2.64662 6.11107 2.92133C5.69995 3.19603 5.37952 3.58648 5.1903 4.04329C5.00108 4.50011 4.95157 5.00278 5.04804 5.48773C5.1445 5.97268 5.3826 6.41814 5.73223 6.76777C6.08186 7.1174 6.52732 7.3555 7.01227 7.45197C7.49723 7.54843 7.99989 7.49892 8.45671 7.3097C8.91352 7.12048 9.30397 6.80005 9.57867 6.38893C9.85338 5.9778 10 5.49446 10 5C10 4.33696 9.73661 3.70108 9.26777 3.23224C8.79893 2.76339 8.16304 2.5 7.5 2.5ZM2.5 18.75C2.5 17.4239 3.02678 16.1521 3.96447 15.2145C4.90215 14.2768 6.17392 13.75 7.5 13.75C7.83152 13.75 8.14946 13.6183 8.38388 13.3839C8.6183 13.1495 8.75 12.8315 8.75 12.5C8.75 12.1685 8.6183 11.8505 8.38388 11.6161C8.14946 11.3817 7.83152 11.25 7.5 11.25C5.51149 11.252 3.60498 12.0428 2.19889 13.4489C0.792799 14.855 0.00198554 16.7615 0 18.75C0 19.0815 0.131696 19.3995 0.366117 19.6339C0.600537 19.8683 0.918479 20 1.25 20C1.58152 20 1.89946 19.8683 2.13388 19.6339C2.3683 19.3995 2.5 19.0815 2.5 18.75Z" fill="black" />

                        {/* <path d="M15 20C14.0111 20 13.0444 19.7068 12.2221 19.1574C11.3999 18.6079 10.759 17.8271..." /> */}
                        {/* ...rest of the SVG path data */}
                      </g>
                    </svg>
                    {/* SVG icon ends here */}
                  </div>
                  <div className="content">
									<h3>Highly Professional Members</h3>
									<p>Organizations are now forced to implement comprehensive cyber security strategies to protect their systems,</p>
								</div>
							</div>
							<div className="content-card d-flex align-items-center">
								<div className="icon">
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
										<g clip-path="url(#clip0_179_2)">
										  <path d="M25 13.75C25 14.4412 24.44 15 23.75 15C23.06 15 22.5 14.4412 22.5 13.75C22.5 10.3038 19.6963 7.5 16.25 7.5C15.56 7.5 15 6.94125 15 6.25C15 5.55875 15.56 5 16.25 5C21.075 5 25 8.92625 25 13.75ZM17.5 13.75C17.5 14.4412 18.06 15 18.75 15C19.44 15 20 14.4412 20 13.75C20 11.6825 18.3175 10 16.25 10C15.56 10 15 10.5588 15 11.25C15 11.9412 15.56 12.5 16.25 12.5C16.94 12.5 17.5 13.06 17.5 13.75ZM16.25 0C15.56 0 15 0.55875 15 1.25C15 1.94125 15.56 2.5 16.25 2.5C22.4525 2.5 27.5 7.54625 27.5 13.75C27.5 14.4412 28.06 15 28.75 15C29.44 15 30 14.4412 30 13.75C30 6.16875 23.8313 0 16.25 0ZM20.3075 22.9387C20.9975 23.6287 21.3338 24.58 21.2325 25.5513C21.1288 26.5325 20.5938 27.4037 19.7638 27.9437C17.65 29.3175 15.2325 29.9875 12.8275 29.9875C9.51 29.9875 6.21251 28.7137 3.75001 26.2512C-0.498745 22.0037 -1.21124 15.2687 2.05751 10.235C2.59626 9.40625 3.46751 8.87 4.44876 8.7675C5.41876 8.6625 6.37251 9.00125 7.06251 9.69125L12.8013 15.43L14.1163 14.115C14.605 13.6262 15.395 13.6262 15.8838 14.115C16.3725 14.6038 16.3725 15.3938 15.8838 15.8825L14.5688 17.1975L20.3075 22.9363V22.9387ZM18.54 24.7062L5.29376 11.46C5.12001 11.2863 4.92376 11.25 4.78751 11.25C4.47126 11.25 4.28 11.4025 4.15376 11.5963C1.52376 15.645 2.09751 21.0638 5.51626 24.4825C8.93501 27.9013 14.355 28.4737 18.4013 25.8463C18.5963 25.72 18.7213 25.5175 18.745 25.29C18.7588 25.1625 18.7513 24.9162 18.54 24.7062Z" fill="#0C0B0B"/>
										</g>
									</svg>
								</div>
								<div className="content">
									<h3>Infrastructure Integration Technology</h3>
									<p>Organizations are now forced to implement comprehensive cyber security strategies to protect their systems,</p>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>

            <div className="services-area style-2 pb-75">
      <div className="container">
        <div className="section-title text-center style-2" data-cue="slideInUp">
          <span className="d-block">Our Services</span>
          <h2>From Your Cyber Security Services.</h2>
        </div>
        <div className="row" data-cues="fadeIn">
          <div className="col-lg-4 col-sm-6">
            <div className="single-services-info">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <g clipPath="url(#clip0_418_20)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M28.7999 0H89.5499V60.75H85.5882V30.375C85.5882 15.7875 73.7626 3.96196 59.1749 3.96196C44.5874 3.96196 32.7619 15.7874 32.7619 30.375V60.75H28.7999V0ZM61.2 29.25V90H0.449951L0.449956 29.25H4.41191V59.625C4.41191 74.2126 16.2374 86.0382 30.825 86.0382C45.4126 86.0382 57.2381 74.2126 57.2381 59.625V29.25H61.2Z" fill="url(#paint0_linear_418_20)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_418_20" x1="12.7012" y1="8.55" x2="67.5067" y2="77.9904" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD9A0" />
                      <stop offset="1" stopColor="#FFF5F1" />
                    </linearGradient>
                    <clipPath id="clip0_418_20">
                      <rect width="90" height="90" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3>
                <a className="text-decoration-none">Endpoint Security</a>
              </h3>
              <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
              <a className="read-more text-decoration-none" href="service-details.html">
                
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="single-services-info">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <g clipPath="url(#clip0_419_41)">
                    <mask id="mask0_419_41" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
                      <path d="M0 0L0 90H90V0H0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_419_41)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.4651 78.5938L19.465 90H25.535V78.5938C25.535 74.1429 29.1432 70.5348 33.5941 70.5348H33.616H45H56.3832H56.4061C60.8566 70.5348 64.4652 74.1429 64.4652 78.5938V90H70.5348V78.5938C70.5348 74.1429 74.1433 70.5348 78.5943 70.5348H78.6159H90V64.4652H78.6159H78.5943C74.1433 64.4652 70.5348 60.8571 70.5348 56.4062V45V33.594C70.5348 29.1431 74.1433 25.5349 78.5943 25.5349L78.6159 25.5349H90V19.4651H78.6159H78.5943C74.1433 19.4651 70.5348 15.8569 70.5348 11.406V0L64.4652 0V11.406C64.4652 15.8569 60.8566 19.4651 56.4061 19.4651H56.3841H45H33.616H33.5941C29.1432 19.4651 25.535 15.8569 25.535 11.406V0L19.465 0V11.406C19.465 15.8569 15.8568 19.4651 11.4059 19.4651H11.384H0V25.5349H11.384C15.8568 25.5349 19.4651 29.1431 19.4651 33.594V45V56.4062C19.4651 60.8571 15.8568 64.4652 11.4059 64.4652H11.384H0V70.5348H11.384C15.8568 70.5348 19.4651 74.1429 19.4651 78.5938ZM64.4652 45V33.594C64.4652 29.1431 60.8566 25.5349 56.4061 25.5349H56.3832H45H33.616L33.5941 25.5349C29.1432 25.5349 25.535 29.1431 25.535 33.594V45V56.4062C25.535 60.8571 29.1432 64.4652 33.5941 64.4652H33.616H45H56.3841H56.4061C60.8566 64.4652 64.4652 60.8571 64.4652 56.4062V45Z" fill="url(#paint0_linear_419_41)" />
                    </g>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_419_41" x1="0" y1="45" x2="90" y2="45" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A7B5FF" />
                      <stop offset="1" stopColor="#F3ACFF" />
                    </linearGradient>
                    <clipPath id="clip0_419_41">
                      <rect width="90" height="90" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3>
                <a className="text-decoration-none">Security Consulting</a>
              </h3>
              <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
              
            </div>
          </div>

        <div className="col-lg-4 col-sm-6">
        <div className="single-services-info">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
              <g clipPath="url(#clip0_419_47)">
                <mask id="mask0_419_47" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
                  <path d="M90 0H0V90H90V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_419_47)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M59.4612 74.0416C55.0944 81.3199 49.8136 84.6 45 84.6C40.1862 84.6 34.9055 81.3199 30.5386 74.0416C26.2361 66.8709 23.4 56.6158 23.4 45C23.4 33.384 26.2361 23.1292 30.5386 15.9585C34.9055 8.68027 40.1862 5.4 45 5.4C49.8136 5.4 55.0944 8.68027 59.4612 15.9585C63.7636 23.1292 66.6 33.384 66.6 45C66.6 56.6158 63.7636 66.8709 59.4612 74.0416ZM90 45C90 20.1472 69.8526 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8526 20.1472 90 45 90C69.8526 90 90 69.8526 90 45ZM5.4 45C5.4 61.1685 15.0897 75.0735 28.9788 81.225C22.3192 73.03 18 59.8559 18 45C18 30.1443 22.3192 16.9699 28.9788 8.77477C15.0897 14.9265 5.4 28.8317 5.4 45ZM84.6 45C84.6 61.1685 74.9101 75.0735 61.0213 81.225C67.6809 73.03 72 59.8559 72 45C72 30.1443 67.6809 16.9699 61.0213 8.77477C74.9101 14.9265 84.6 28.8317 84.6 45ZM45 49.95C47.7337 49.95 49.95 47.7337 49.95 45C49.95 42.2662 47.7337 40.05 45 40.05C42.2662 40.05 40.05 42.2662 40.05 45C40.05 47.7337 42.2662 49.95 45 49.95Z" fill="url(#paint0_linear_419_47)" />
                </g>
              </g>
              <defs>
                <linearGradient id="paint0_linear_419_47" x1="45" y1="0" x2="45" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B8DBFC" />
                  <stop offset="1" stopColor="#F8FBFE" />
                </linearGradient>
                <clipPath id="clip0_419_47">
                  <rect width="90" height="90" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h3>
            <a className="text-decoration-none">Threat Intelligence Services</a>
          </h3>
          <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
          
        </div>
      </div>

     <div className="col-lg-4 col-sm-6">
  <div className="single-services-info">
    <div className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <g clipPath="url(#clip0_419_101)">
          <mask id="mask0_419_101" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
            <path d="M90 0H0V90H90V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_419_101)">
            <path d="M45 90C41.25 90 38.125 88.789 35.625 86.3671C33.125 83.9453 31.875 81.0157 31.875 77.5782C31.875 75.6252 32.2656 73.8671 33.0469 72.3046C33.8281 70.7422 35.1953 69.0232 37.1484 67.1485C39.1797 65.2734 40.7812 63.5157 41.9531 61.875C43.2031 60.1564 43.8281 58.6719 43.8281 57.4218V53.203C42.1094 52.8124 40.5859 52.0312 39.2578 50.8595C38.0078 49.6094 37.1875 48.1248 36.7969 46.4062H32.5781C31.25 46.4062 29.6875 47.0313 27.8906 48.2814C26.0937 49.531 24.375 51.0547 22.7344 52.8516C21.0938 54.6484 19.4531 55.9764 17.8125 56.8359C16.25 57.6954 14.4531 58.1252 12.4219 58.1252C8.90627 58.1252 5.93748 56.875 3.51562 54.3748C1.17188 51.8751 0 48.7498 0 45C0 41.25 1.17188 38.125 3.51562 35.625C5.93748 33.125 8.90627 31.875 12.4219 31.875C15.7031 31.875 18.5156 33.0469 20.8594 35.3906C23.2031 37.7344 25.3125 39.7265 27.1875 41.3672C29.0625 43.0078 30.8594 43.8281 32.5781 43.8281H36.7969C37.1875 42.0313 38.0078 40.5468 39.2578 39.375C40.5859 38.125 42.1094 37.3437 43.8281 37.0312V32.8125C43.8281 30.7813 42.2656 28.2031 39.1406 25.0781L36.6797 22.6172C33.4766 19.4141 31.875 16.0156 31.875 12.4219C31.875 8.90627 33.125 5.97654 35.625 3.63281C38.2031 1.21094 41.3281 0 45 0C48.7498 0 51.8751 1.21094 54.3748 3.63281C56.875 6.05471 58.1252 8.98439 58.1252 12.4219C58.1252 16.4062 56.1717 20.1563 52.2657 23.6719C48.3592 27.2656 46.4062 30.3125 46.4062 32.8125V37.0312C48.2031 37.3437 49.6876 38.125 50.8595 39.375C52.1096 40.5468 52.8907 42.0313 53.203 43.8281H57.4218C60.0781 43.8281 63.1251 41.8359 66.5627 37.8516C70.078 33.8672 73.75 31.875 77.5782 31.875C81.0936 31.875 84.0236 33.1641 86.3671 35.7422C88.789 38.2422 90 41.3281 90 45C90 48.7498 88.789 51.8751 86.3671 54.3748C83.9453 56.875 81.0157 58.1252 77.5782 58.1252C74.2968 58.1252 71.5235 56.992 69.2577 54.7267C66.9924 52.461 64.8828 50.508 62.9298 48.8673C60.9763 47.2266 59.1408 46.4062 57.4218 46.4062H53.203C52.578 50.1561 50.3127 52.4218 46.4062 53.203V57.4218C46.4062 59.7654 48.3592 62.7737 52.2657 66.4452C56.1717 70.1172 58.1252 73.8279 58.1252 77.5782C58.1252 81.0936 56.8359 84.0236 54.2578 86.3671C51.7576 88.789 48.672 90 45 90Z" fill="url(#paint0_linear_419_101)" />
          </g>
        </g>
        <defs>
          <linearGradient id="paint0_linear_419_101" x1="70.875" y1="14.4" x2="19.8" y2="66.375" gradientUnits="userSpaceOnUse">
            <stop offset="0.0509862" stopColor="#FFB6E1" />
            <stop offset="1" stopColor="#FBE3EA" />
          </linearGradient>
          <clipPath id="clip0_419_101">
            <rect width="90" height="90" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <h3>
      <a className="text-decoration-none" >Security Training and Awareness</a>
    </h3>
    <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
    
  </div>
</div>



 <div className="col-lg-4 col-sm-6">
            <div className="single-services-info">
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                        <g clipPath="url(#clip0_419_89)">
                            <mask id="mask0_419_89" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
                                <path d="M90 0H0V90H90V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_419_89)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M46.4143 0C47.4084 0 48.2143 0.805887 48.2143 1.8V19.2037C48.2143 21.1821 50.9422 21.7124 51.6834 19.878L58.2025 3.74155C58.5751 2.81983 59.6241 2.37451 60.5461 2.74691L63.1687 3.80651C64.0903 4.17892 64.5359 5.22801 64.1633 6.14974L57.213 23.3527C56.4781 25.1707 58.7677 26.6863 60.1546 25.2998L73.2739 12.1801C73.9773 11.4772 75.1167 11.4772 75.8196 12.1801L77.8198 14.1802C78.5228 14.8832 78.5228 16.0228 77.8198 16.7258L66.0384 28.5072C64.6321 29.9137 66.2094 32.2258 68.0319 31.4294L83.2995 24.7588C84.2107 24.3608 85.2719 24.7766 85.6696 25.6876L86.8023 28.2796C87.2001 29.1906 86.7843 30.2517 85.8735 30.6497L68.2803 38.3363C66.4929 39.1171 67.0505 41.7857 69.0007 41.7857H88.2C89.194 41.7857 90 42.5916 90 43.5857V46.4143C90 47.4084 89.194 48.2143 88.2 48.2143H69.0012C67.0504 48.2143 66.4933 50.8828 68.2803 51.6636L85.8735 59.3505C86.7843 59.7483 87.2001 60.8094 86.8023 61.7202L85.6696 64.3122C85.2719 65.2234 84.2107 65.6392 83.2995 65.241L68.0319 58.5706C66.2094 57.7741 64.6321 60.0863 66.0384 61.493L77.8198 73.2739C78.5228 73.9773 78.5228 75.1167 77.8198 75.8196L75.8196 77.8198C75.1167 78.5228 73.9773 78.5228 73.2739 77.8198L60.1546 64.7001C58.7677 63.3136 56.4781 64.8292 57.213 66.6472L64.1633 83.8503C64.5359 84.7719 64.0903 85.8208 63.1687 86.1935L60.5461 87.2532C59.6241 87.6253 58.5751 87.1803 58.2025 86.2582L51.6834 70.1221C50.9422 68.2875 48.2143 68.818 48.2143 70.7962V88.2C48.2143 89.194 47.4084 90 46.4143 90H43.5857C42.5916 90 41.7857 89.194 41.7857 88.2V70.7962C41.7857 68.818 39.0579 68.2875 38.3168 70.1221L31.7972 86.2582C31.4248 87.1803 30.3757 87.6253 29.454 87.2532L26.8314 86.1935C25.9097 85.8208 25.4644 84.7719 25.8368 83.8503L32.7872 66.6472C33.5218 64.8292 31.2321 63.3136 29.8455 64.7001L16.7258 77.8198C16.0229 78.5228 14.8832 78.5228 14.1803 77.8198L12.1801 75.8196C11.4772 75.1167 11.4772 73.9773 12.1801 73.2739L23.9616 61.4925C25.368 60.0862 23.7907 57.7741 21.9681 58.5706L6.70027 65.241C5.78934 65.6392 4.72819 65.2234 4.33019 64.3122L3.19773 61.7202C2.79972 60.8094 3.21556 59.7483 4.12652 59.3505L21.7196 51.6636C23.5068 50.8828 22.9493 48.2143 20.9989 48.2143H1.8C0.805887 48.2143 0 47.4084 0 46.4143V43.5857C0 42.5916 0.805887 41.7857 1.8 41.7857H20.999C22.9494 41.7857 23.5069 39.1171 21.7197 38.3363L4.1265 30.6497C3.21554 30.2517 2.79971 29.1906 3.19772 28.2796L4.33018 25.6876C4.72819 24.7766 5.78929 24.3608 6.70027 24.7588L21.9681 31.4294C23.7907 32.2258 25.368 29.9137 23.9616 28.5072L12.1801 16.7258C11.4772 16.0229 11.4772 14.8832 12.1801 14.1802L14.1802 12.1801C14.8832 11.4772 16.0229 11.4772 16.7258 12.1801L29.8455 25.2998C31.232 26.6863 33.5218 25.1708 32.7872 23.3527L25.8368 6.14974C25.4644 5.22801 25.9097 4.17892 26.8314 3.80651L29.454 2.74691C30.3757 2.37451 31.4248 2.81983 31.7972 3.74155L38.3168 19.878C39.0579 21.7124 41.7857 21.1821 41.7857 19.2037V1.8C41.7857 0.805887 42.5916 0 43.5857 0H46.4143ZM45 64.2856C55.6511 64.2856 64.2856 55.6511 64.2856 45C64.2856 34.3488 55.6511 25.7143 45 25.7143C34.3488 25.7143 25.7143 34.3488 25.7143 45C25.7143 55.6511 34.3488 64.2856 45 64.2856Z" fill="url(#paint0_linear_419_89)" />
                            </g>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_419_89" x1="9.225" y1="7.2" x2="45" y2="90" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#ACAAFF" />
                                <stop offset="1" stopColor="#C0E8FF" />
                            </linearGradient>
                            <clipPath id="clip0_419_89">
                                <rect width="90" height="90" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <h3>
                    <a className="text-decoration-none">Security Awareness Training</a>
                </h3>
                <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
                
            </div>
        </div>


        <div className="col-lg-4 col-sm-6">
      <div className="single-services-info">
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
            <g clipPath="url(#clip0_419_95)">
              <mask id="mask0_419_95" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90">
                <path d="M90 0H0V90H90V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_419_95)">
                <path fillRule="evenodd" clipRule="evenodd" d="M45 90C69.8526 90 90 69.8526 90 45C90 20.1472 69.8526 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8526 20.1472 90 45 90ZM45 84.6C66.8704 84.6 84.6 66.8704 84.6 45C84.6 23.1295 66.8704 5.4 45 5.4C23.1295 5.4 5.4 23.1295 5.4 45C5.4 66.8704 23.1295 84.6 45 84.6ZM45 79.2C63.8883 79.2 79.2 63.8883 79.2 45C79.2 26.1119 63.8883 10.8 45 10.8C26.1119 10.8 10.8 26.1119 10.8 45C10.8 63.8883 26.1119 79.2 45 79.2ZM45 73.8C60.9057 73.8 73.8 60.9057 73.8 45C73.8 29.0942 60.9057 16.2 45 16.2C29.0942 16.2 16.2 29.0942 16.2 45C16.2 60.9057 29.0942 73.8 45 73.8ZM68.4 45C68.4 57.9235 57.9235 68.4 45 68.4C32.0765 68.4 21.6 57.9235 21.6 45C21.6 32.0765 32.0765 21.6 45 21.6C57.9235 21.6 68.4 32.0765 68.4 45ZM63 45C63 54.9409 54.9409 63 45 63C35.0589 63 27 54.9409 27 45C27 35.0589 35.0589 27 45 27C54.9409 27 63 35.0589 63 45Z" fill="url(#paint0_linear_419_95)" />
              </g>
            </g>
            <defs>
              <linearGradient id="paint0_linear_419_95" x1="12.375" y1="8.55" x2="67.05" y2="78.525" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD9A0" />
                <stop offset="1" stopColor="#FFF5F1" />
              </linearGradient>
              <clipPath id="clip0_419_95">
                <rect width="90" height="90" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3>
          <a className="text-decoration-none">Application Security Testing</a>
        </h3>
        <p>This service focuses on securing end-user devices like laptops, desktops, and mobile devices from cybersecurity threats.</p>
        
      </div>
    </div>

    <div className="projects-area pb-75">
    <div className="container">
        <div className="projects-section-title">
            <div className="row align-items-center" data-cue="slideInUp">
                <div className="col-lg-7 col-md-8">
                    <div className="title">
                        <span className="d-block">Our Projects</span>
                        <h2>Feat to Celebrate: Showcasing Some of Our Proud Projects.</h2>
                    </div>
                </div>
               
            </div>
        </div>
        <div className="projects-box-info" data-cue="slideInUp">
            <ul className="main-box">
                <li className="box bg-1">
                    <span>
                        <img src="assets/user/images/projects/projects-1.jpg" alt="projects-image" />
                    </span>
                    <div className="detail">
                        <div className="content">
                            <h3>
                                <a className="text-decoration-none">Data Loss Prevention (DLP)</a>
                            </h3>
                            <p>This includes implementing strategies and tools to prevent sensitive data...</p>
                            
                        </div>
                    </div>
                </li>
                <li className="box bg-2">
                    <span>
                        <img src="assets/user/images/projects/projects-2.jpg" alt="projects-image" />
                    </span>
                    <div className="detail">
                        <div className="content">
                            <h3>
                                <a className="text-decoration-none">Data Encryption</a>
                            </h3>
                            <p>Encrypts sensitive data at rest, in transit, or in use...</p>
                            
                        </div>
                    </div>
                </li>
                <li className="box bg-3">
                    <span>
                        <img src="assets/user/images/projects/projects-3.jpg" alt="projects-image" />
                    </span>
                    <div className="detail">
                        <div className="content">
                            <h3>
                                <a className="text-decoration-none">Endpoint Detection and Response (EDR)</a>
                            </h3>
                            <p>Monitors and responds to threats on end-user devices...</p>
                            {/* <a className="read-more text-decoration-none" href="service-details.html">
                                Read More
                                <i className="ri-arrow-right-line"></i>
                            </a> */}
                        </div>
                    </div>
                </li>
                <li className="box bg-4">
                    <span>
                        <img src="assets/user/images/projects/projects-4.jpg" alt="projects-image" />
                    </span>
                    <div className="detail">
                        <div className="content">
                            <h3>
                                <a className="text-decoration-none">Artificial Intelligence for Cybersecurity</a>
                            </h3>
                            <p>Often used in modern systems and threat hunting platforms...</p>
                            
                        </div>
                    </div>
                </li>
                <li className="box active">
                    <span>
                        <img src="assets/user/images/projects/projects-3.jpg" alt="projects-image" />
                    </span>
                    <div className="detail active">
                        <div className="content">
                            <h3>
                                <a className="text-decoration-none">Encrypted File Sharing with Access Control</a>
                            </h3>
                            <p>send encrypted files with a decryption key shared separately and securely...</p>
                            
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>

{/* <div className="counter-area pb-75 style-2">
      <div className="container">
        <div className="row" data-cues="fadeIn">
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter-card style-2">
              <h2>
                <span className="counter">36</span>+
              </h2>
              <p>YEARS' EXPERIENCE</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter-card style-2">
              <h2>
                <span className="counter">645</span>+
              </h2>
              <p>CYBER SECURITY EXPERTS</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter-card style-2">
              <h2>
                <span className="counter">100</span>%
              </h2>
              <p>CUSTOMER SATISFACTION</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter-card style-2">
              <h2>
                <span className="counter">35</span>M
              </h2>
              <p>CUSTOMER SERVED GLOBALLY</p>
            </div>
          </div>
        </div>
      </div>
    </div> */}



    {/* <div className="team-area pb-75">
      <div className="container">
        <div className="section-title text-center style-2" data-cue="slideInUp">
          <span className="d-block">Our Team</span>
          <h2>Meet Our Awesome Team Members.</h2>
        </div>
        <div className="row" data-cues="fadeIn">
          <div className="col-lg-3 col-sm-6">
            <div className="single-team-card">
              <div className="image">
                <a className="text-decoration-none" href="team.html">
                  <img src="assets/user/images/team/team-1.jpg" alt="team-image" />
                </a>
              </div>
              <h3>
                <a className="text-decoration-none" href="team.html">Bonnie Acosta</a>
              </h3>
              <p>Lead Developer</p>
              <div className="social-list">
                <ul className="list-unstyled ps-0 mb-0">
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
                      <i className="ri-facebook-circle-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/">
                      <i className="ri-pinterest-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-team-card">
              <div className="image">
                <a className="text-decoration-none" href="team.html">
                  <img src="assets/user/images/team/team-2.jpg" alt="team-image" />
                </a>
              </div>
              <h3>
                <a className="text-decoration-none" href="team.html">Warren Riner</a>
              </h3>
              <p>CEO & Founder</p>
              <div className="social-list">
                <ul className="list-unstyled ps-0 mb-0">
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
                      <i className="ri-facebook-circle-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/">
                      <i className="ri-pinterest-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-team-card">
              <div className="image">
                <a className="text-decoration-none" href="team.html">
                  <img src="assets/user/images/team/team-3.jpg" alt="team-image" />
                </a>
              </div>
              <h3>
                <a className="text-decoration-none" href="team.html">Helen Kurt</a>
              </h3>
              <p>Developer</p>
              <div className="social-list">
                <ul className="list-unstyled ps-0 mb-0">
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
                      <i className="ri-facebook-circle-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/">
                      <i className="ri-pinterest-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-team-card">
              <div className="image">
                <a className="text-decoration-none" href="team.html">
                  <img src="assets/user/images/team/team-4.jpg" alt="team-image" />
                </a>
              </div>
              <h3>
                <a className="text-decoration-none" href="team.html">Wanda Wagner</a>
              </h3>
              <p>CO-Founder</p>
              <div className="social-list">
                <ul className="list-unstyled ps-0 mb-0">
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
                      <i className="ri-facebook-circle-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/">
                      <i className="ri-pinterest-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-ellipse"></div>
    </div> */}



    <div className="partner-area style-2 pb-75">
      <div className="container">
        <div className="partner-slider-info" data-cue="slideInUp">
          <Slider {...settings} className="partner-slider">
            {images.map((img, index) => (
              <div className="single-partner-logo" key={index}>
                <img src={`assets/user/images/partner/${img}`} alt={`partner-${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>         
        </div>
      </div>
    </div>

      
    </>
  );
};

export default Section;


