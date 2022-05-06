import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="modal-form-container">
      <form onSubmit={onSignUp}>
        <div
        className="errors2">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-container">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="login-container">
          <input
            type="text"
            className="login-input"
            placeholder="Email"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="login-container">
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="login-container">
          <input
            type="password"
            className="login-input"
            placeholder="Repeat Password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
        <button className="modal-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
