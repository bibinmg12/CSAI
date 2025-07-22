// import React,{useState , useEffect} from "react";
// import Layout from '../components/Layout';

// const Register=()=>{
//     const [formData , setFormData]=useState({
//         name:"",
//         contact:"",
//         email:"",
//         password:"",
//         usertype:"User", 

//     });

//     const handleChange=(e)=>{
//         setFormData({ ...formData,[e.target.name]:e.target.value});
//     };

//     const handleSubmit = async(e)=>{
//         e.preventDefault();

//         const data = new FormData();

//         data.append("name", formData.name);
//         data.append("contact", formData.contact);
//         data.append("email", formData.email);
//         data.append("password", formData.password);
//         data.append("usertype", formData.usertype);


//         const response= await fetch("http://localhost:8000/register_user/",{
//             method: "POST",
//             // headers:{"Content-Type":"application/json"},
//             // body:JSON.stringify(formData),
//             body: data,
//         });

//         const result=await response.json();
//         alert(result.message || result.error);
//         window.location.reload();

//     };

// useEffect(() => {
//   if (window.scrollCue) {
//     window.scrollCue.init({
//       interval: -200,
//       duration: 800,
//       percentage: 0.85,
//     });

//     // Manually trigger the scroll logic once
//     setTimeout(() => {
//       window.dispatchEvent(new Event('scroll'));
//     }, 100); // small delay ensures DOM is fully rendered
//   }
// }, []);

//      return (
 
//       <>
//         {/* <div className="page-title-area">
//           <div className="container">
//             <div className="page-title-content text-center">
//               <h1>Register</h1>
//               <ul className="list-unstyled ps-0 mb-0">
//                 <li className="d-inline-block">
//                   <a className="text-decoration-none" href="/">Home</a>
//                 </li>
//                 <li className="d-inline-block">Register</li>
//               </ul>
//             </div>
//           </div>
//         </div> */}

//         {/* Start Login Area */}
//         <div className="login-area ptb-100" style={{ backgroundColor: 'white' }}>
//           <div className="page-title-area">
//           <div className="container">
//             <div className="page-title-content text-center">
//               <h1>Register</h1>
//               <ul className="list-unstyled ps-0 mb-0">
//                 <li className="d-inline-block">
//                   <a className="text-decoration-none" href="/">Home</a>
//                 </li>
//                 <li className="d-inline-block">Register</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//           <div className="container">
//             <div className="login-info" data-cue="slideInUp">
//               <h1>Register Now</h1>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     placeholder="Name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="number"
//                     name="contact"
//                     className="form-control"
//                     placeholder="Contact"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Email"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     name="password"
//                     className="form-control"
//                     placeholder="Your password"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value=""
//                     id="flexCheckDefault"
//                   />
//                   <label className="form-check-label" htmlFor="flexCheckDefault">
//                     Remember me
//                   </label>
//                 </div> */}
//                 <button className="default-btn border-0" type="submit">
//                   <i className="ri-arrow-right-line"></i>
//                   Register
//                 </button>
//                 <p>
//                   Already have an account? Please{' '}
//                   <a className="text-decoration-none" href="/log">Login Here</a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
 
//   );
// };

// export default Register;



import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import LinearProgress from "@mui/material/LinearProgress";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    usertype: "User",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ level: "", score: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let level = "Weak";
    let progress = 25;
    if (score >= 4) {
      level = "Strong";
      progress = 100;
    } else if (score >= 3) {
      level = "Medium";
      progress = 75;
    } else if (score === 2) {
      level = "Weak";
      progress = 50;
    }

    return { level, score: progress };
  };

  const validate = () => {
    const errs = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;

    if (!nameRegex.test(formData.name)) {
      errs.name = "Name should only contain letters and spaces.";
    }
    if (!emailRegex.test(formData.email)) {
      errs.email = "Invalid email format.";
    }
    if (!contactRegex.test(formData.contact)) {
      errs.contact = "Contact must be a 10-digit number.";
    }
    if (!formData.password) {
      errs.password = "Password is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("contact", formData.contact);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("usertype", formData.usertype);

    const response = await fetch("http://localhost:8000/register_user/", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    alert(result.message || result.error);
    window.location.reload();
  };

  useEffect(() => {
    if (window.scrollCue) {
      window.scrollCue.init({
        interval: -200,
        duration: 800,
        percentage: 0.85,
      });
      setTimeout(() => {
        window.dispatchEvent(new Event("scroll"));
      }, 100);
    }
  }, []);

  return (
    <>
      <div className="login-area ptb-100" style={{ backgroundColor: 'white' }}>
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content text-center">
              <h1>Register</h1>
              <ul className="list-unstyled ps-0 mb-0">
                <li className="d-inline-block">
                  <a className="text-decoration-none" href="/">Home</a>
                </li>
                <li className="d-inline-block">Register</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="login-info" data-cue="slideInUp">
            <h1>Register Now</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="contact"
                  className="form-control"
                  placeholder="Contact"
                  onChange={handleChange}
                  required
                />
                {errors.contact && <small className="text-danger">{errors.contact}</small>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label style={{ fontSize: 14, color: 'gray' }}>
                  • Use at least 6 characters, 1 uppercase, 1 number, and 1 special character
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control mt-1"
                  placeholder="Your password"
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '55%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: 'gray'
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
                {errors.password && <small className="text-danger">{errors.password}</small>}

                {/* Password strength feedback */}
                {formData.password && (
                  <div style={{ marginTop: 8 }}>
                    <small>Password Strength: <strong>{passwordStrength.level}</strong></small>
                    <LinearProgress
                      variant="determinate"
                      value={passwordStrength.score}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        mt: 1,
                        backgroundColor: "#eee",
                        '& .MuiLinearProgress-bar': {
                          backgroundColor:
                            passwordStrength.level === "Strong"
                              ? "green"
                              : passwordStrength.level === "Medium"
                              ? "orange"
                              : "red",
                        },
                      }}
                    />
                  </div>
                )}
              </div>

              <button className="default-btn border-0 mt-3" type="submit">
                <i className="ri-arrow-right-line"></i>
                Register
              </button>

              <p className="mt-3">
                Already have an account? Please{' '}
                <a className="text-decoration-none" href="/log">Login Here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;






