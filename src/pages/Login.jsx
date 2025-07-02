// import React from "react";
// import "./style.css";
// import { useNavigate } from "react-router-dom";
// import { LivoLogo } from "../assets";

// export default function Login() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     sessionStorage.setItem("token", "dummy-token");
//     navigate("/dashboard"); // Navigate to main dashboard
//   };
//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <div className="logo-circle">
//             {/* You can put your logo SVG here */}
//             <img src={LivoLogo} />
//           </div>
//           <h1>Welcome to Livo Admin Panel</h1>
//         </div>

//         <form className="login-form">
//           <label>Email Address</label>
//           <input type="email" placeholder="admin@livo.com" />

//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" />
//           <button
//             onClick={handleLogin}
//             className="customButton mt-4 h-12 w-full text-lg"
//             type="submit"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk } from "../store/slices/authSlice";
import { LivoLogo } from "../assets";

const Login = () => {
  const [email, setEmail] = useState("superadmin@yopmail.com");
  const [password, setPassword] = useState("Test@1234");

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">
            <img src={LivoLogo} />
          </div>
          <h1>Welcome to Livo Admin Panel</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-2">{error}</p>}

          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@livo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="customButton mt-4 h-12 w-full text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
