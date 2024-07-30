import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.scss";

const Register = () => {
  // State variables for form inputs, errors, and result message
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  // Function to handle input changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr("All fields are required.");
      return;
    }
    else setErr(null);
    try {
      // Sending registration request to the server
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setResult(<p>User created successfully!</p>);
      setTimeout(()=>navigate("/login"),3000)
    } catch (err) {
      // Handling errors
      setResult(null);
      setErr(err.response.data);
    }
  };

  // JSX structure for the Register component
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Join UniVerse!!</h1>
          <p>
          The Social Media Hub Exclusively for University Students. Create, Share and Evolve Together!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {/* Displaying errors and result */}
            {err && <p className="error">{err}</p>}
            {result && <p className="result">{result}</p>}
            {/* Button for registration */}
            <button onClick={handleClick} type="reset">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
