import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [containerActive, setContainerActive] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.roleId === 1) {
          navigate("/admin/products"); // admin dashboard
        } else {
          navigate("/user-dashboard"); // regular user
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = registerInfo;
    const roleId = 2; // Default role: user

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, roleId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registered successfully. You can now log in.");
        setRegisterInfo({ name: '', email: '', password: '' });
        setContainerActive(false);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong with registration.");
    }
  };

  const renderSocialIcons = () => {
    const icons = [
      { href: '#', className: 'fa-brands fa-google-plus-g' },
      { href: '#', className: 'fa-brands fa-facebook-f' },
      { href: '#', className: 'fa-brands fa-github' },
      { href: '#', className: 'fa-brands fa-linkedin-in' },
    ];

    return icons.map((icon, index) => (
      <a href={icon.href} key={index} className="icon">
        <i className={icon.className}></i>
      </a>
    ));
  };

  const renderTogglePanel = (className, title, text, buttonText, onClick) => (
    <div className={`toggle-panel ${className}`}>
      <h1>{title}</h1>
      <p>{text}</p>
      <button className="hidden" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className={`container ${containerActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Create Account</h1>
          <div className="social-icons">{renderSocialIcons()}</div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={registerInfo.name}
            onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerInfo.email}
            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerInfo.password}
            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          {/* <div className="social-icons">{renderSocialIcons()}</div> */}
          <span>or use your email and password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <a href="#">Forget Your Password?</a> */}
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          {renderTogglePanel(
            'toggle-left',
            'Welcome Back!',
            'Enter your personal details to use all of site features',
            'Sign In',
            () => setContainerActive(false)
          )}
          {renderTogglePanel(
            'toggle-right',
            'Hello, Friend!',
            'Register with your personal details to use all of site features',
            'Sign Up',
            () => setContainerActive(true)
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
