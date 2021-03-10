import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";
export default function Register() {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [passwordCheck, setpasswordCheck] = useState();
  const [displayName, setdisplayName] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h1>Register</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}></input>

        <label htmlFor="register-password">password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}></input>
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setpasswordCheck(e.target.value)}></input>

        <label htmlFor="register-display-name">Display Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setdisplayName(e.target.value)}></input>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
