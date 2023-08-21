import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, bio, image, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      {/* <div className="head"><h1>Sign Up</h1></div> */}
      <form className="signup-form-form" action="/posts/new" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <legend><h1 className="signup-header">Sign Up</h1></legend>
        {errors.length > 0 ? (<ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>) : ""}
        <div className="signup-input-sect">
          <div className="name-sect">
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                className="name-input"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                className="name-input"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
          <label>
            Biography:
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={email}
              className="account-info"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              className="account-info"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              className="account-info"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              className="account-info"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
