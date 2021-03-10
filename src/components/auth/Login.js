import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
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
      <h1>Log In</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}></input>

        <label htmlFor="login-password">password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}></input>

        <input type="submit" value="LogIn" />
      </form>
    </div>
  );
}
